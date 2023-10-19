import { child, get, ref, set } from "firebase/database";
import authService from '../auth/auth.service';
import BaseService from "../base.service";
import { UserModel } from './user.model';

export class UserService extends BaseService {
  constructor() {
    super()
  }

  getUserByEmail = async (email: string): Promise<UserModel | undefined> => {
    return get(child(this.dbRef, `users/${authService.getHash(email)}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
          return snapshot.val() as UserModel
        } else {
          return undefined
        }
      })
      .catch((error) => {
        console.error(error)
        return undefined
      })
  }

  addUser = async (email: string, fullName: string) => {
    const hash = authService.getHash(email)

    set(ref(this.database, 'users/' + hash), {
      email,
      fullName,
    })
      .then(() => console.info(`Successfully added user with hash=${hash} to database.`))
      .catch((error) => console.error(error))
  }  
}

const userService = new UserService()

export default userService
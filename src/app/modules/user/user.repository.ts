import { child, get, ref, set } from "firebase/database";
import BaseRepository from "../base.repository";
import { UserModel } from "./user.model";

class UserRepository extends BaseRepository {
  constructor() {
    super()
  }

  getUserByUserId = async (userId: string): Promise<UserModel | undefined> => {
    return get(child(this.dbRef, `users/${userId}`))
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

  addUser = async (user: UserModel) => {
    set(ref(this.database, 'users/' + user.userId), user)
      .then(() => console.info(`Added user with Email ${user.email} to database.`))
      .catch((error) => console.error(error))
  }
}

export default UserRepository
import { child, get, ref, set, update } from 'firebase/database';
import authService from '../auth/auth.service';
import BaseService from '../base.service';
import { UserModel } from './user.model';

export class UserService extends BaseService {
  constructor() {
    super();
  }

  getUserByEmail = async (email: string): Promise<UserModel | undefined> => {
    return get(child(this.dbRef, `users/${authService.getUserId(email)}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val() as UserModel;
        } else {
          return undefined;
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  };

  addUser = async (email: string, fullName: string) => {
    try {
      const hash = authService.getUserId(email);

      const updates: Record<string, any> = {};
      updates[`/users/${hash}`] = { email, fullName };
      updates[`/users/${hash}/generation`] = {
        wordCount: 0,
        lastGenerationId: '',
        generationCount: 0,
        lastGenerationTime: 0,
        generationStartDate: Date.now(),
      };
      await update(this.dbRef, updates);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  resetGeneration = async (email: string) => {
    try {
      const hash = authService.getUserId(email);

      await set(ref(this.database, `users/${hash}/generation`), {
        wordCount: 0,
        lastGenerationId: '',
        generationCount: 0,
        lastGenerationTime: 0,
        generationStartDate: Date.now(),
      });
    } catch (error) {
      console.error(error);
    }
  };
}

const userService = new UserService();

export default userService;

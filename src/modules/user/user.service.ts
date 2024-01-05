import { child, get, ref, set, update } from 'firebase/database';
import authService from '../auth/auth.service';
import BaseService from '../base.service';
import { UserModel } from './user.model';
import {
  GenerationData,
  GenerationModel,
} from '../generation/generation.model';

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
      await set(ref(this.database, `users/${hash}`), {
        email,
        fullName,
        generation: {
          wordCount: 0,
          lastGenerationId: '',
          generationCount: 0,
          lastGenerationTime: Date.now(),
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  getUserGenerationIds = async (email: string) => {
    const generationModel: GenerationModel[] = [];
    const snapshotValue = await get(
      child(this.dbRef, `generations/${authService.getUserId(email)}`)
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val() as GenerationData;
        } else {
          return undefined;
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });

    if (!snapshotValue) {
      return generationModel;
    }

    for (const [key, value] of Object.entries(snapshotValue)) {
      generationModel.push(value);
    }

    return generationModel;
  };
}

const userService = new UserService();

export default userService;

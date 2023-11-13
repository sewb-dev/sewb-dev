import crypto from 'crypto';
import BaseService from '../base.service';

export class AuthService extends BaseService {
  constructor() {
    super();
  }

  getUserId = (email: string) => {
    return crypto.createHash('sha256').update(email).digest('hex');
  };
}

const authService = new AuthService();

export default authService;

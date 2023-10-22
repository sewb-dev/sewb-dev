import crypto from 'crypto';
import BaseService from "../base.service";

export class AuthService extends BaseService {
  constructor() {
    super()
  }

  getHash = (data: string) => {
    return crypto
      .createHash('sha256')
      .update(data)
      .digest('hex')};
    
}

const authService = new AuthService()

export default authService
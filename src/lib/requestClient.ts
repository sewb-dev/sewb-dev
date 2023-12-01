import axios from 'axios';
import envVariables from './env';

const requestClient = axios.create({
  baseURL: `${envVariables.getEnv('BASE_URL')}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default requestClient;

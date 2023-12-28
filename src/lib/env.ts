type ENVKeys =
  | 'FIREBASE_PROJECT_ID'
  | 'FIREBASE_KEY'
  | 'FIREBASE_DATABASE_URL'
  | 'BASE_URL'
  | 'NEXTAUTH_URL'
  | 'GOOGLE_ID'
  | 'GOOGLE_SECRET'
  | 'NEXTAUTH_SECRET'
  | 'SHOW_FEATURE'
  | 'OPENAI_API_KEY'
  | 'REDIS_HOST'
  | 'REDIS_PASSWORD'
  | 'REDIS_PORT'
  | 'REDIS_USERNAME'
  | 'NODE_ENV'
  | 'IS_DEVELOPMENT'
  | 'MOCK_GENERATION'
  | 'DAILY_WORD_LIMIT'
  | 'DAILY_GENERATION_LIMIT'
  | 'MAX_TEXT_INPUT_LENGTH'
  | 'MODEL_URL'
  | 'MODEL_CALLER_TOKEN';
class EnvironmentVariable {
  keys: Record<ENVKeys, string | undefined>;

  constructor() {
    this.keys = {
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_KEY: process.env.FIREBASE_KEY,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      BASE_URL: typeof window !== 'undefined' ? '' : process.env.BASE_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      GOOGLE_ID: process.env.GOOGLE_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      SHOW_FEATURE: process?.env?.NEXT_PUBLIC_SHOW_FEATURE ?? 'true',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      REDIS_HOST: process.env.REDIS_HOST,
      REDIS_PASSWORD: process.env.REDIS_PASSWORD,
      REDIS_PORT: process.env.REDIS_PORT,
      REDIS_USERNAME: process.env.REDIS_USERNAME,
      NODE_ENV: process.env.NODE_ENV,
      IS_DEVELOPMENT: String(
        process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'test'
      ),
      MOCK_GENERATION: process.env.MOCK_GENERATION ?? 'false',
      DAILY_WORD_LIMIT: '3000',
      DAILY_GENERATION_LIMIT: '3',
      MAX_TEXT_INPUT_LENGTH: '2000',
      MODEL_URL: process.env.MODEL_URL,
      MODEL_CALLER_TOKEN: process.env.MODEL_CALLER_TOKEN,
    };
  }
  getEnv(key: ENVKeys, defaultValue = ''): string {
    if (this.keys[key] === undefined) {
      return defaultValue;
    }
    return this.keys[key]!;
  }
}

const envVariables = new EnvironmentVariable();
export default envVariables;

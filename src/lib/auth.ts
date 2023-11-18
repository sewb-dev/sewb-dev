import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleAuthProvider from 'next-auth/providers/google';
import userService from '../modules/user/user.service';
import envVariables from './env';

export const config = {
  providers: [
    GoogleAuthProvider({
      clientId: envVariables.getEnv('GOOGLE_ID'),
      clientSecret: envVariables.getEnv('GOOGLE_SECRET'),
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (!(profile?.email && profile?.name)) {
        return false;
      }
      const { email, name } = profile;

      if (account?.provider === 'google') {
        const user = await userService.getUserByEmail(email);
        if (!user) {
          return await userService.addUser(email, name);
        }
        return true;
      }
      return false;
    },
  },
} satisfies NextAuthOptions;

export const auth = (
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) => getServerSession(...args, config);

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { UserSession } from '../../../types';

export default (req, res) =>
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    database: process.env.DATABASE_URL,
    pages: {
      signIn: '/signin',
    },
    callbacks: {
      async session(session, user) {
        if (user) {
          (session.user as UserSession).id = user.sub as string;
        }
        return session;
      },
    },
  });

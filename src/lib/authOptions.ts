import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text', 
        },
        password: {
          label: 'Password',
          type: 'password', 
        },
      },
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
                        credentials!.email,
                        credentials!.password,
          );
          const user = userCredential.user;

          if (user) {
            return {
              id: user.uid,
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              image: user.photoURL,
              emailVerified: user.emailVerified,
            };
          }
          return null;
        } catch (e) {
          console.error('Login error', e);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        token.name = user.name || '';
        token.picture = user.image || '';
      }
      return token;
    },
    async session({ session, token }) {
      // Preenche o session.user com os dados do token
      session.user = {
        uid: token.uid as string,
        email: token.email as string,
        name: token.name as string,
        image: token.picture as string,
      };
      return session;
    },
  },

}
import { User, getServerSession } from 'next-auth'

export const session = async ({ session, token }: any) => {
  session.user.id = token.id
  return session
}

export const getUserSession = async (): Promise<User> => {
    try {
      const authUserSession = await getServerSession({
        callbacks: {
          session,
        },
      });
  
  
      return authUserSession?.user;
    } catch (error) {
      console.error('Error during session decryption:', error);
      throw error; // Rethrow the error to propagate it up
    }
  };
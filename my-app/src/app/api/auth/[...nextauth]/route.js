import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import admin  from "@/fireBase/fireBaseAdmin";

const db = admin.firestore()
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const { email, password } = credentials;
        try {
          const { uid } = await admin.auth().getUserByEmail(email);
          const idToken = await admin.auth().createCustomToken(uid);
          return Promise.resolve({ idToken });
        } catch (err) {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: process.env.MEXT_AUTH_SECRET,
  callbacks: {
    signIn: async ({ user }) => {
      const { id, email, ...restUser } = user;
      const docRef = db.collection("users").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        await db
          .collection("users")
          .doc(id)
          .set({ ...restUser, friends: [], followers: [] });
      }
      return true;
    },
    
    session: async ({ session, token }) => {
      session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

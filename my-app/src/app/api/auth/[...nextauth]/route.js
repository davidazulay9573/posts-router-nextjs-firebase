import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import firestore from "@/fireBase/fireBaseAdmin";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.MEXT_AUTH_SECRET,
  callbacks: {
    signIn: async ({ user }, account, profile) => {
      if (user) {
        const { id, ...restuser } = user;

        const docRef = firestore.collection("users").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
          await firestore.collection("users").doc(id).set(restuser);
        }
        return true;
      }
      return false;
    },
    async session({ session, token }) {
       session.user.id = token.sub
      return session;
    },
   
  },
  // pages: {
  //   signIn: "/sign-in",
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

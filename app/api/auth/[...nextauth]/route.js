import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import User from "@models/user";

import { connectToDatabase } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user.email });

    session.user.id = sessionUser._id.toString();
  },

  async signIn({ profile }) {
    try {
      // severless -> lambda -> dynamodb
      await connectToDatabase();

      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };

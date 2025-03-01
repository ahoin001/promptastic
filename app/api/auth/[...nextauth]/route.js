import { connectToDatabase } from "@utils/database";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Sign in with Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        console.log("\n \n Creds: ", credentials);
        const { email, password } = credentials;

        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("No user found with this email");
        }
        if (!user.password) {
          throw new Error("Another form of sign in is using this email");
        }

        const isPasswordValid = await bcrypt.compare(
          password || "",
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id,
          email: user.email,
          username: user.username,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDatabase();

        if (account?.provider === "google") {
          console.log("GOOGLE TIME: ", account);
          console.log("GOOGLE Profile: ", profile);

          const userExists = await User.findOne({ email: profile.email });
          if (!userExists) {
            console.log("USER DIDNT EXIST Profile: ", profile);
            await User.create({
              email: profile.email,
              username: profile.name,
              image: profile?.picture || "",
            });
          }
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };

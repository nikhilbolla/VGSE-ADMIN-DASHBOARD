import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { userName, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ userName });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log(passwordMatch);
          if (!passwordMatch) {
            console.log("Password wrong")
            return null;
          }
          return {
            name: user.userName,
            email: user.email
          };
        } catch (error) {
          console.log("Error");
          return;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

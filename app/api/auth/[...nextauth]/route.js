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
          return user
        } catch (error) {
          console.log("Error");
          return;
        }
      },
    }),
  ],
  callbacks: {

    async jwt({ token, user }) {
     // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
   
     if (user) {
      token.username = user.userName;
      token.img = user.img;
      token.email = user.email;
      token.phone = user.phone;
     }
     return token;
    },
     async session({ session, token }) {
     // user param present in the session(function) does not recive all the data from DB call -> fetchUserInfo(credentials.opt)
      if(token) {
        session.user.username = token.username;
        session.user.img = token.img;
        session.user.email = token.email;
        session.user.phone = token.phone;
      }
     return session;
    },
   },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

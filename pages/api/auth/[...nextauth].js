import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

const options = {
  providers: [
    FacebookProvider({
      clientId: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      scope: "publish_actions",
      scope: "email publish_actions",
    }),
  ],
};

export default NextAuth(options);

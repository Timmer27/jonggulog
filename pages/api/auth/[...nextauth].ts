import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  secret: process.env.NextAuth_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    })
    // ...add more providers here
  ],
  // pages: {
  //   signIn: '/auth/login',	// 로그인 페이지 경로
  // },
  // callbacks: {
  //   session: async ({ session, token, user }) => {
  //     if (session.user) {
  //       session.user.id = user.id;	// 세션에 사용자 ID를 저장함
  //     }
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);

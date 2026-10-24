import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Hash the password at startup so we never store it plaintext in memory
// In production, store a pre-hashed password in ADMIN_PASSWORD_HASH instead
const getAdminHash = () => {
  const plain = process.env.ADMIN_PASSWORD ?? "";
  return bcrypt.hashSync(plain, 10);
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (!username || !password) return null;

        const validUsername = username === process.env.ADMIN_USERNAME;
        const validPassword = await bcrypt.compare(password, getAdminHash());

        if (validUsername && validPassword) {
          return { id: "1", name: "Admin", email: "admin@mkdesigns.local" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname === "/admin/login";

      // Protect admin routes (except login page)
      if (isOnAdminPanel && !isOnLoginPage) {
        if (!isLoggedIn) return false; // Redirect to login
        return true; // Allow access
      }

      // Redirect from login page if already authenticated
      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true; // Allow all other routes
    },
  },
});

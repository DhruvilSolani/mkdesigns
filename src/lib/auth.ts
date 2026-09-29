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
  secret: process.env.NEXTAUTH_SECRET,
});

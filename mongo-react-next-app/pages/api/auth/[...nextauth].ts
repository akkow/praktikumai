import NextAuth, { NextAuthOptions } from "next-auth";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, User } from "../../../schemas/user.schema";
import connect from "../../../lib/mongoose";
import { verifyPassword } from "../../../lib/auth";
import { UserDto } from "../../../dto/user.dto"
import { getToken } from "next-auth/jwt";

let userAccount: UserDto = null;

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Prisijunkite",
            credentials: {
                username: {
                    label: "Vartotojas",
                    type: "text",
                    placeholder: "vartotojo vardas",
                },
                password: { label: "Slaptažodis", type: "password"},
            },
            async authorize(credentials, req) {
                await connect()
                const user: IUser = await User.findOne({
                    username: credentials.username,
                })
                if(!user) {
                    throw new Error("No user found!")
                }
                const isAuthenticated = await verifyPassword(
                    credentials.password,
                    user.password
                )

                if (!isAuthenticated) throw new Error("negeras slaptazodis")
                userAccount = {
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    username: user.username
                }
                return userAccount as any
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 20 * 60, // one hour
        updateAge: 10 * 60,
    },
    theme: {
        colorScheme: "light",
    },
    callbacks: {
        session({ session, token, user}) {
            const s: any = session
            if (userAccount !== null) {
                s.user = userAccount;
                return s
            } else if (
                typeof token.user !== typeof undefined &&
                (typeof s.user === typeof undefined || 
                    typeof s.user !== typeof undefined)
            )
                s.user = token.user as any;
            else if (typeof token !== typeof undefined) s.token = token
            
            return s
        },

        async jwt({ token, user, account, profile, isNewUser }) {
            if (typeof user !== typeof undefined) {
                token.user = user;
            }
            return token
        },
    },
}
export default NextAuth(authOptions)

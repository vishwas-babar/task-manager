import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import authSchema from "./schema/userSchema";
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@gmail.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials) => {
                try {
                    // Validate credentials using Zod schema
                    const validate = authSchema.safeParse(credentials);

                    if (!validate.success) {
                        const message = validate.error?.format().email?._errors[0] || validate.error?.format().password?._errors[0] || "Invalid credentials!";
                        throw new Error(message);
                    }

                    // Find user by email
                    const user = await prisma.user.findUnique({
                        where: { email: validate.data.email },
                    });

                    if (!user) {
                        throw new CredentialsSignin("User not found");
                        // return null;
                    } 


                    // Compare passwords
                    const isPasswordMatch = await bcrypt.compare(validate.data.password, user.password);
                    
                    if (!isPasswordMatch) {
                        throw new CredentialsSignin("Wrong password!");
                        // return null;
                    }

                    // Return user object
                    return {
                        email: user.email,
                        id: user.id,
                    };

                } catch (error: any) {
                    console.log(error)
                    throw new CredentialsSignin(error.message)
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {

            if (user) {
                token.id = user.id
                token.email = user.email
            }
            return token
        },
        session: ({ session, token }) => {

            if (token) {
                session.user.email = token.email || ""
                session.user.id = token.id as string || ""
            }

            return session;
        },
    },
    pages: {
        signIn: '/signin',
    },
});
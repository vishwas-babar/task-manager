
'use server'
import { prisma } from '@/lib/prisma';
import authSchema from '../schema/userSchema';
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


export const createUser = async (formData: { email: string, password: string }) => {
    try {
        // Validate request body
        const validate = authSchema.safeParse(formData);


        if (!validate.success) {
            return {
                message: validate.error?.format().email?._errors[0] || validate.error?.format().password?._errors[0] || "invalida credentials!"
            };
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validate.data?.email },
        });

        if (existingUser) {
            return {
                success: false,
                message: "please sign in, with same email!"
            }
        }

        const hashedPassword = await bcrypt.hash(validate.data.password, 10);
        console.log("hashed password: ", hashedPassword)

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email: validate.data.email,
                password: hashedPassword,
            }
        })

        const signinStatus = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
            // redirectTo: '/dashboard'
        })
        return {
            success: true,
            message: "new user created."
        }
    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: "something went wrong!"
        }
    }
};

export const signinUser = async (formData: { email: string, password: string }) => {
    try {
        const signinStatus = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
            // redirectTo: '/dashboard'
        })

        return {
            success: true,
            message: "signed in successfully."
        }
    } catch (error: any) {
        // return {
        //     success: false,
        //     message: error.message
        // }
        if (error instanceof AuthError) {
            
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: error.message.split('.')[0] }
                default:
                    return { message: error.message || "Something went wrong!" }
            }
        }

        throw error
    }
}
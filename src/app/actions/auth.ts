'use server';

import bcrypt from "bcryptjs";
import { sql } from '@vercel/postgres';
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { User } from "../lib/definitions";

const SignupFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'Username must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
});

type SignupFormState =
    | {
        errors?: {
            username?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined;

export async function signup(state: SignupFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { username, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await sql`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${email}, ${hashedPassword})
        RETURNING id;
    `;

    if (!userId) {
        return {
            message: 'An error occurred while creating your account.',
        };
    }

    try {
        const id = userId.toString();
        await createSession(id);
    } catch {
        return {
            message: 'An error occurred while parsing userId or creating a session.',
        };
    }

    redirect('/home');
}

const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string()
});

type LoginFormState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined;

export async function login(state: LoginFormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    const userQuery = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const user = userQuery.rows[0];
    if (!user) return {
        message: "No user with that email address found."
    };

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return {
            message: "Incorrect email or password."
        }

    createSession(user.id);

    redirect('/home');
}

export async function logout() {
    deleteSession();
    redirect('/login');
}
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
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long.' })
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
            password?: string[]
        }
        message?: string
    }
    | undefined;

export async function signup(state: SignupFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { username, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
        INSERT INTO users (username, password)
        VALUES (${username}, ${hashedPassword});
    `;

    const userQuery = await sql<User>`SELECT * FROM users WHERE username=${username}`;
    const user = userQuery.rows[0];
    if (!user) return {
        message: "Failed to add the user to the database."
    };

    try {
        await createSession(user.id);
    } catch {
        return {
            message: "An error occurred while logging in.",
        };
    }

    redirect('/home');
}

const LoginFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'Username must be at least 2 characters long.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long.' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
});

type LoginFormState =
    | {
        error?: string
        message?: string
    }
    | undefined;

export async function login(state: LoginFormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            error: "Incorrect username or password.",
        };
    }

    const { username, password } = validatedFields.data;

    const userQuery = await sql<User>`SELECT * FROM users WHERE username=${username}`;
    const user = userQuery.rows[0];
    if (!user) return {
        error: "Incorrect username or password."
    };

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return {
        error: "Incorrect username or password."
    }

    try {
        await createSession(user.id);
    } catch {
        return {
            error: "An error occurred while logging in."
        };
    }

    redirect('/home');
}

export async function logout() {
    try {
        await deleteSession();
    } catch {
        return {
            error: "An error occurred while logging out."
        };
    }
    redirect('/');
}
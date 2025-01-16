'use server';

import bcrypt from "bcryptjs";
import { sql } from '@vercel/postgres';
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Call the provider or db to create a user...
    // 2. Prepare data for insertion into database
    const { username, email, password } = validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert the user into the database or call an Auth Library's API
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

    // 4. Create user session
    try {
        const id = userId.toString();
        await createSession(id);
    } catch {
        return {
            message: 'An error occurred while parsing userId or creating a session.',
        };
    }

    // 5. Redirect user
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
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // 2. Prepare data for insertion into database
    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await sql`
        SELECT id FROM users
        WHERE email = ${email}, password = ${hashedPassword}
        LIMIT 1;
    `;

    // 4. Create user session
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

export async function logout() {
    deleteSession();
    redirect('/login');
}
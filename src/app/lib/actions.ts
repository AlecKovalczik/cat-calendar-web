'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { verifySession } from "./dal";

///////////
// Users //
///////////

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}



///////////
// Tasks //
///////////

const TaskFormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string({
        invalid_type_error: "Please enter a task title",
    }).min(1, { message: "Please enter a task title", }),
    description: z.string({
        invalid_type_error: "Please enter a task description",
    }),
    status: z.enum(["incomplete", "complete"], {
        invalid_type_error: "Please select a task status",
    }).default("incomplete"),
});

// Use zod to create the expected types
const CreateTask = TaskFormSchema.omit({ id: true });

// Use zod to update the expected types
const UpdateTask = TaskFormSchema.omit({ id: true });

export type State = {
    errors?: {
        userId?: string[];
        title?: string[];
        description?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
    console.log(formData);

    // Validate form fields using Zod
    const validatedFields = CreateTask.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status') || "incomplete",
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Task.',
        };
    }

    // Prepare data for insertion into the database
    const { title, description, status } = validatedFields.data;
    
    const session = await verifySession();
    const userId = session?.userId.toString();

    try {
        await sql`
            INSERT INTO tasks (user_id, title, description, status)
            VALUES (${userId}, ${title}, ${description}, ${status})
        `;
    } catch {
        return { message: "Database Error: Failed to Create Invoice." };
    }

    revalidatePath('/home/tasks');
    return { message: "Success: Task created." }
}

export async function updateTask(id: string, prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = UpdateTask.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status') || "incomplete",
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Task.',
        };
    }

    const { title, description, status } = validatedFields.data;

    try {
        await sql`
            UPDATE tasks
            SET title = ${title}, description = ${description}, status = ${status}
            WHERE id = ${id}
        `;
    } catch {
        return { message: "Database Error: Failed to Update Task." };
    }

    revalidatePath('/home/tasks');
    return { message: "Success: Task updated." };
}

export async function deleteTask(prevState: State, id: string) {
    try {
        await sql`DELETE FROM tasks WHERE id = ${id}`;
        revalidatePath('/home/tasks');
        return { message: 'Deleted Task.' };
    } catch {
        return { message: "Database Error: Failed to Delete Task." };
    }
}
'use server';

import { z } from "zod";
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";

const TaskFormSchema = z.object({
    id: z.string(),
    title: z.string({
        invalid_type_error: "Please enter a task title",
    }),
    description: z.string({
        invalid_type_error: "Please enter a task description",
    }),
    status: z.enum(["incomplete", "completed"], {
        invalid_type_error: "Please select a task status",
    }),
});

// Use zod to create the expected types
const CreateTask = TaskFormSchema.omit({ id: true });

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createTask(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateTask.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status'),
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

    try {
        await sql`
            INSERT INTO tasks (title, description, status)
            VALUES (${title}, ${description}, ${status})
        `;
    } catch {
        return { message: "Database Error: Failed to Create Invoice." };
    }

    revalidatePath('/home/tasks');
    return { message: "Success: Task created."}
}
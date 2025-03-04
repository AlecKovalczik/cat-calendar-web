'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { getUser } from "../lib/dal";
import { redirect } from "next/navigation";

///////////
// Tasks //
///////////

const TaskFormSchema = z.object({
    id: z.string(),
    userId: z.string({
        invalid_type_error: "Please make sure you are logged in",
    }),
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
const CreateTask = TaskFormSchema.omit({ id: true, userId: true });

// Use zod to update the expected types
const UpdateTask = TaskFormSchema.omit({ id: true, userId: true });

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
        description: formData.get('description') || "",
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
    
    const user = await getUser();
    
    if (user === null) redirect('/');

    const id: string = user.id

    try {
        await sql`
            INSERT INTO tasks (user_id, title, description, status)
            VALUES (${id}, ${title}, ${description}, ${status})
        `;
    } catch {
        return { message: "Database Error: Failed to Create Task." };
    }

    revalidatePath('/home/tasks');
    return { message: "Success: Task created." };
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
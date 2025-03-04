'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { getUser } from "../lib/dal";
import { redirect } from "next/navigation";

const TaskFormSchema = z.object({
    id: z.string(),
    userId: z.string({
        invalid_type_error: "Please make sure you are logged in.",
    }),
    name: z.string({
        invalid_type_error: "Please enter a name for your cat.",
    }).min(1, { message: "Please enter a task title.", }),
});

// Use zod to create the expected types
const CreateCat = TaskFormSchema.omit({ id: true, userId: true });

export type State = {
    errors?: {
        name?: string | undefined;
    };
    message?: string | null;
};

export async function createCat(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateCat.safeParse({
        
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Cat.',
        };
    }

    // Prepare data for insertion into the database
    const {  } = validatedFields.data;
    
    const user = await getUser();
    
    if (user === null) redirect('/');

    const id: string = user.id

    try {
        await sql`
            INSERT INTO tasks (user_id, )
            VALUES (${id}, )
        `;
    } catch {
        return { message: "Database Error: Failed to Create Cat." };
    }

    revalidatePath('/home');
    return { message: "Success: Cat created." };
}
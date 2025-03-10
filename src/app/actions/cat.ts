'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { getUser, verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getCat = cache(async () => {
    const session = await verifySession();

    try {
        const idString = session.userId;
        const data = await sql`
            SELECT * FROM cats
            WHERE user_id = ${idString} 
        `;

        const cat = data.rows[0];
        if (!cat) return null;

        return cat;
    } catch {
        console.log('Failed to fetch cat');
        return null;
    }
})

const CatFormSchema = z.object({
    id: z.string(),
    userId: z.string({
        invalid_type_error: "Please make sure you are logged in.",
    }),
    name: z.string({
        invalid_type_error: "Please enter a name for your cat.",
    }).min(1, { message: "Please enter a name for your cat.", }),
    coat_length: z.enum(["long", "short", "hairless"], {
        invalid_type_error: "Please select a coat type.",
    }).default("long"),
    coat_type: z.enum(["solid", "tabby", "tuxedo", "calico", "tortoiseshell", "siamese"], {
        invalid_type_error: "Please select a task status.",
    }).default("solid"),
    coat_color: z.enum(["gray", "brown", "black", "white", "orange", "silver"], {
        invalid_type_error: "Please select a task status.",
    }).default("gray"),
});

// Use zod to create the expected types
const CreateCat = CatFormSchema.omit({ id: true, userId: true });

// Use zod to create the expected types
const UpdateCat = CatFormSchema.omit({ id: true, userId: true });

export type State = {
    errors?: {
        name?: string[] | undefined;
        coat_length?: string[] | undefined;
        coat_type?: string[] | undefined;
        coat_color?: string[] | undefined;
    };
    message?: string | null;
};

export async function createCat(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateCat.safeParse({
        name: formData.get('name'),
        coat_length: formData.get('coat_length'),
        coat_type: formData.get('coat_type'),
        coat_color: formData.get('coat_color'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Cat.',
        };
    }

    // Prepare data for insertion into the database
    const { name, coat_length, coat_type, coat_color } = validatedFields.data;
    
    const user = await getUser();
    
    if (user === null) redirect('/');

    const userId: string = user.id

    try {
        await sql`
            INSERT INTO cats (user_id, name, coat_length, coat_type, coat_color)
            VALUES (${userId}, ${name}, ${coat_length}, ${coat_type}, ${coat_color})
        `;
    } catch {
        return { message: "Database Error: Failed to Create Cat." };
    }

    redirect('/home/cat');
}

export async function updateCat(id: string, prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = UpdateCat.safeParse({
        name: formData.get('name'),
        coat_length: formData.get('coat_length'),
        coat_type: formData.get('coat_type'),
        coat_color: formData.get('coat_color'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Cat.',
        };
    }

    // Prepare data for insertion into the database
    const { name, coat_length, coat_type, coat_color } = validatedFields.data;

    try {
        await sql`
            UPDATE cats
            SET name = ${name}, coat_length = ${coat_length}, coat_type = ${coat_type}, coat_color = ${coat_color}
            WHERE id = ${id}
        `;
    } catch {
        return { message: "Database Error: Failed to Update Cat." };
    }

    redirect('/home/cat');
    return { message: "Success: Cat updated." };
}

export async function deleteCat(prevState: State, id: string) {
    try {
        await sql`DELETE FROM cats WHERE id = ${id}`;
        redirect('/home/cat/adopt');
        return { message: 'Deleted Cat.' };
    } catch {
        return { message: "Database Error: Failed to Delete Cat." };
    }
}
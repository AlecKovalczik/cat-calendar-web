'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { getUser } from "./users"
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getFriends = cache(async () => {
    const session = await verifySession();

    try {
        const idString = session.userId;
        const data = await sql`
            SELECT * FROM friends
            WHERE user_id = ${idString} 
        `;

        const connection = data.rows[0];
        if (!connection) return null;

        return connection;
    } catch {
        console.log('Failed to fetch connection');
        return null;
    }
})

const ConnectionSchema = z.object({
    id: z.string({
        invalid_type_error: "Please make sure you are logged in.",
    }),
    friendId: z.string({
        invalid_type_error: "Please select an user with a real account."
    }),
    accepted: z.boolean({
        invalid_type_error: "Please make sure this is a boolean value."
    }),
    blocked: z.boolean({
        invalid_type_error: "Please make sure this is a boolean value."
    })
});

// Use zod to create the expected types
const SendFriendRequest = ConnectionSchema.omit({ id: true, accepted: true, blocked: true });

// const BlockUser = ConnectionSchema.omit({ id: true, accepted: true })

// Use zod to update the expected types
// const UpdateConnection = TaskFormSchema.omit({ id: true });

export type State = {
    errors?: {
        id?: string[];
        friendId?: string[];
        accepted?: string[];
        blocked?: string[];
    };
    message?: string | null;
};

export async function sendFriendRequest(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = SendFriendRequest.safeParse({
        friendId: formData.get('friend_id'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to send a friend request.',
        };
    }

    // Prepare data for insertion into the database
    const { friendId } = validatedFields.data;
    
    const user = await getUser();
    
    if (user === null) redirect('/');

    const id: string = user.id

    try {
        await sql`
            INSERT INTO friends (user_id, friend_id, accepted, blocked)
            VALUES (${id}, ${friendId}, ${false}, ${false})
        `;
    } catch {
        return { message: "Database Error: Failed to send a friend request." };
    }

    revalidatePath('/home/friends');
    return { message: "Success: Request sent." };
}

// export async function updateTask(id: string, prevState: State, formData: FormData) {
//     // Validate form fields using Zod
//     const validatedFields = UpdateTask.safeParse({
//         title: formData.get('title'),
//         description: formData.get('description'),
//         status: formData.get('status') || "incomplete",
//     });

//     // If form validation fails, return errors early. Otherwise, continue.
//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Missing Fields. Failed to Update Task.',
//         };
//     }

//     const { title, description, status } = validatedFields.data;

//     try {
//         await sql`
//             UPDATE tasks
//             SET title = ${title}, description = ${description}, status = ${status}
//             WHERE id = ${id}
//         `;
//     } catch {
//         return { message: "Database Error: Failed to Update Task." };
//     }

//     revalidatePath('/home/tasks');
//     return { message: "Success: Task updated." };
// }

// export async function deleteTask(prevState: State, id: string) {
//     try {
//         await sql`DELETE FROM tasks WHERE id = ${id}`;
//         revalidatePath('/home/tasks');
//         return { message: 'Deleted Task.' };
//     } catch {
//         return { message: "Database Error: Failed to Delete Task." };
//     }
// }
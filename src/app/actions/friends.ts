'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { getUser } from "./users"
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { User } from "../lib/definitions";

export async function searchNonFriends(searchTerm: string) {
    const session = await verifySession();
    if (!session.isAuth) redirect("/");

    try {
        const data = await sql<User>`
                SELECT id, username FROM users
                WHERE username ILIKE ${`%${searchTerm}%`}
                    AND id != ${session.userId}
                EXCEPT
                SELECT id, username FROM friendships 
                INNER JOIN users 
                    ON friend_id = id
                WHERE user_id = ${session.userId}
            `;
            // Add a way to do pagination

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch users with that search term.");
    }
}

export async function searchFriends(searchTerm: string) {
    const session = await verifySession();
    if (!session.isAuth) redirect("/");

    try {
        const data = await sql`
            SELECT friend_id, username 
            FROM friendships 
            INNER JOIN users 
                ON friend_id = id
            WHERE user_id = ${session.userId} 
                AND username ILIKE ${`%${searchTerm}%`}
            LIMIT 50;
        `;
        // Add a way to do pagination instead of just limiting to 50
        
        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch friends with that search term.");
    }
}

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
            INSERT INTO friendships (user_id, friend_id, accepted, blocked)
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
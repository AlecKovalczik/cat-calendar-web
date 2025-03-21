import { cache } from "react";
import { verifySession } from "../lib/dal";
import { sql } from "@vercel/postgres";
import { User } from "../lib/definitions";
import { redirect } from "next/navigation";

export const getUser = cache(async () => {
    const session = await verifySession();

    try {
        const idString = session.userId;
        const data = await sql`
            SELECT id, username FROM users
            WHERE id = ${idString};
        `;

        const user = data.rows[0];
        if (!user) return null;

        return user;
    } catch {
        console.log('Failed to fetch user');
        return null;
    }
})

// export const getUsers = cache(async () => {
//     const session = await verifySession();
//     if (!session.isAuth) redirect("/");

//     try {
//         const data = await sql<User>`
//                 SELECT id, username FROM users
//                 LIMIT 50;
//             `

//         return data.rows;
//     } catch (error) {
//         console.error("Database Error:", error);
//         throw new Error("Failed to fetch users.");
//     }
// })

export async function searchOtherUsers(searchTerm: string) {
    const session = await verifySession();
    if (!session.isAuth) redirect("/");

    try {
        const data = await sql<User>`
                SELECT id, username FROM users
                WHERE username ILIKE ${`%${searchTerm}%`}
                AND id != ${session.userId}
                LIMIT 50;
            `

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch users with that search term.");
    }
}
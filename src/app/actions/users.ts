import { cache } from "react";
import { verifySession } from "../lib/dal";
import { sql } from "@vercel/postgres";

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

export const getUsers = cache(async () => {
    const session = await verifySession();
    if (!session.isAuth) return null;

    
})
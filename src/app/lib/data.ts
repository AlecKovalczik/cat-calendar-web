import { sql } from "@vercel/postgres";
import { Task } from "@/app/lib/definitions"
import { getUser } from "./dal";

export async function fetchAllTasks() {
    try {
        const data = await sql<Task>`SELECT * FROM tasks`;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch tasks data.");
    }
}

export async function fetchUsersTasks() {
    const user = await getUser();
        if (!user) {
            return {
                message: 'No user session found.'
            };
        }
    
    const id: string = user.id

    try {
        const data = await sql<Task>`
            SELECT * FROM tasks 
            WHERE user_id = ${id};
        `;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch tasks data for the given user");
    }
}
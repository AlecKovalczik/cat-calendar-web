import { sql } from "@vercel/postgres";
import { Task } from "@/app/lib/definitions"
import { verifySession } from "./dal";

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
    const session = await verifySession();
    const userId = session?.userId.toString();

    try {
        const data = await sql<Task>`
            SELECT * FROM tasks 
            WHERE user_id = ${userId};
        `;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch tasks data for the given user");
    }
}
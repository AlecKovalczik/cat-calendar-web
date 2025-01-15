import { sql } from "@vercel/postgres";
import { Task } from "@/app/lib/definitions"

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
    const userId = "13D07535-C59E-4157-A011-F8D2EF4E0CBB";

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
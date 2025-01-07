import { sql } from "@vercel/postgres";
import { Task } from "@/app/lib/definitions"

export async function fetchTasks() {
    try {
        const data = await sql<Task>`SELECT * FROM tasks`;

        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch tasks data.');
    }
}
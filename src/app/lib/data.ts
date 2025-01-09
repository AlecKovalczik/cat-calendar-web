import { sql } from "@vercel/postgres";
import { Task } from "@/app/lib/definitions"
import { cookies } from "next/headers";

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
    const userId = (await cookies()).get("session")?.value;
        if (userId === undefined) {
            throw Error("some how the user's session is undefined but they got here!?"); // should make this redirect to login
        }

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
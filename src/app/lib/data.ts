import { sql } from "@vercel/postgres";
import { Task } from "@/app/lib/definitions"
import { getUser } from "./dal";
import { redirect } from "next/navigation";

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
    if (user === null) redirect('/');
    const id: string = user.id;

    try {
        const data = await sql<Task>`
            SELECT * FROM tasks 
            WHERE user_id = ${id};
        `;

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch tasks data for the given user.");
    }
}

export async function fetchSearchedTasks(searchTerm: string) {
    const user = await getUser();
    if (user === null) redirect('/');
    const id: string = user.id;

    try {
        const data = await sql<Task>`
            SELECT * FROM tasks
            WHERE user_id = ${id}
            AND title ILIKE ${`%${searchTerm}%`};
        `

        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch tasks data with that search term.");
    }
}
// import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { tasks } from "@/app/lib/placeholder-data";

const client = await db.connect();

async function seedTasks() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS tasks (
            id UUID DEFAULT uuid_generate_v4 PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(255) DEFAULT "Incomplete"
        );
    `;

    const insertedTasks = await Promise.all(
        tasks.map(async (task) => {
            return client.sql`
                INSERT INTO tasks (id, title, description, status)
                VALUES (${task.id}, ${task.title}, ${task.description}, ${task.status})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedTasks;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedTasks();
        await client.sql`COMMIT`;

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}

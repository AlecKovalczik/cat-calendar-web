// import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import bcryptjs from "bcryptjs";
import { users, tasks } from "@/app/lib/placeholder-data";


const client = await db.connect();

///////////
// Users //
///////////

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
  
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcryptjs.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, username, email, password)
          VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    return insertedUsers;
  }



///////////
// Tasks //
///////////

async function seedTasks() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS tasks (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(255) NOT NULL
        );
    `;

    const insertedTasks = await Promise.all(
        tasks.map((task) => {
            return client.sql`
                INSERT INTO tasks (user_id, title, description, status)
                VALUES (${task.userId},  ${task.title}, ${task.description}, ${task.status})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedTasks;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        // await client.sql`DROP TABLE users`;
        // await client.sql`DROP TABLE tasks`;
        await seedUsers();
        await seedTasks();
        await client.sql`COMMIT`;

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}

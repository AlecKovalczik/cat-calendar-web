// import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import bcryptjs from "bcryptjs";
import { users, tasks, cats } from "@/app/lib/placeholder-data";

const client = await db.connect();

///////////
// Users //
///////////

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      return client.sql`
          INSERT INTO users (id, username, password)
          VALUES (${user.id}, ${user.username}, ${hashedPassword})
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

//////////
// Cats //
//////////

async function seedCats() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  await client.sql`
    CREATE TABLE IF NOT EXISTS cats (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      alive BOOLEAN DEFAULT TRUE,
      birthday DATE DEFAULT NOW(),
      hunger NUMBER DEFAULT 0,
      name VARCHAR,
      coat_color VARCHAR,
      coat_type VARCHAR,
      coat_length NUMBER,
    );
  `

  const insertedCats = await Promise.all(
    cats.map((cat) => {
      return client.sql`
          INSERT INTO cats (user_id, name, coat_color, coat_type, coat_length)
          VALUES (${cat.userId}, ${cat.name}, ${cat.coatColor}, ${cat.coatType}, ${cat.coatLength})
          ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedCats;
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

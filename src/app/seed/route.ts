// import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import bcryptjs from "bcryptjs";
import { users, tasks, cats, friendships } from "@/app/lib/placeholder-data";

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
      name VARCHAR(255) NOT NULL,
      coat_color VARCHAR(255) NOT NULL,
      coat_type VARCHAR(255) NOT NULL,
      coat_length VARCHAR(255) NOT NULL
    );
  `;

  // alive BOOLEAN DEFAULT TRUE,
  // birthday DATE DEFAULT NOW(),
  // deadline NUMBER DEFAULT 0,
  // frequency NUMBER DEFAULT 7,

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

/////////////
// Friends //
/////////////

async function seedFriendships() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  await client.sql`
    CREATE TABLE IF NOT EXISTS friendships (
      friendship_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      friend_id UUID NOT NULL,
      accepted BOOLEAN NOT NULL,
      blocked BOOLEAN NOT NULL
    );
  `;

  const insertedFriendships = await Promise.all(
    friendships.map((friendship) => {
      return client.sql`
          INSERT INTO friendships (user_id, friend_id, accepted, blocked)
          VALUES (${friendship.userId}, ${friendship.friendId}, ${friendship.accepted}, ${friendship.blocked})
          ON CONFLICT (friendship_id) DO NOTHING;
      `;
    }),
  );

  return insertedFriendships;
}



export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await client.sql`DROP TABLE users`;
    // await client.sql`DROP TABLE tasks`;
    // await client.sql`DROP TABLE cats`;
    await client.sql`DROP TABLE friendships`;
    // await seedUsers();
    // await seedTasks();
    // await seedCats();
    await seedFriendships();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

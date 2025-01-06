export async function GET() {
    try {
    //   await client.sql`BEGIN`;
    //   await seedTasks();
    //   await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
    //   await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }
  
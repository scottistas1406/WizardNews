const { Client } = require('pg');
const client = new Client({
 connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seed() {
  await client.connect();

  // Write your code to seed the database here

  await client.end();
}

seed();

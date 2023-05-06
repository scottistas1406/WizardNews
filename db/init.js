const { Client } = require('pg');
const client = new Client({
  connectionString: DATABASE_URL='postgres://wizard_0asp_user:XWyLcbN4dHObsjzw9j6YWjbG6B6llxPp@dpg-chbbv5u7avjcvo5998sg-a.oregon-postgres.render.com/wizard_0asp'
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

import pgPromise from 'pg-promise' ;


const dataBase = pgPromise();
const db = dataBase({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});
 
const setupDatabase = async () => {
  db.none(`
    CREATE TABLE IF NOT EXISTS planets (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT
      );
      `)
      await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
      await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)

      await db.none(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          token TEXT
        );
      `);
        await db.none(`INSERT INTO users (username, password) VALUES ('Martina', 'martina123')`)
    }
    
    setupDatabase().catch((error) => {
      console.error('Error setting up database:', error);
    });

    export default db;
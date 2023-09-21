import Pool from "pg-pool";

const pool = new Pool({
  database: "postgres",
  connectionString: process.env.NEXT_PUBLIC_CONNECTION_STRING,
  allowExitOnIdle: true,
});

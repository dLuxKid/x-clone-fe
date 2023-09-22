import Pool from "pg-pool";

export const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_CONNECTION_STRING,
  allowExitOnIdle: true,
});

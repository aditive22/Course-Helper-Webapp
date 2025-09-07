const { Pool } = require("pg");
require("dotenv").config();
//console.log(dotenv);

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = pool;

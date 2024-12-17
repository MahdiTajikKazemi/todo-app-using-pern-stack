const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root",
  // host: "localhost",   // For running without docker
  host: "db",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;

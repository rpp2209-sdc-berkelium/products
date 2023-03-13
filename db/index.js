// adds the pooling functionality from node-postgres
const { Pool } = require('pg');

// creates a new Pool instance (no more than one Pool is recommended) and connects to the postgres container
const pool = new Pool({
  user: process.env.PG_USER,
  // TODO: the PG_HOST environment variable will need to change when deploying
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
})

// exports a query function that will return the result of a pool query
module.exports = {
  query: (text, params) => pool.query(text, params)
}

require('dotenv').config()
const sql = require('mssql')
const config = {
  server : process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database:process.env.DB_NAME,
  connectionTimeout : JSON.parse(process.env.DB_CONNECTION_TIMEOUT_VALUE),
  options: {
    encrypt: true,
  },
}
const sqlpool = async () => {
  const pool = await sql.connect(config)
  return pool
}


module.exports = {
  sqlpool
}
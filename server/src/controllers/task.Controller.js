const sql = require('mssql')
require('dotenv').config()
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
const getProjects = async (req,res) => {
    try {
        const query = ` select * from projects`
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        console.log("response....",response.recordset[0])
        res.status(200).json({status:true,data:response.recordset[0]})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting projects"})
    }
}

const getEmployess = async () => {
    try {
        const query = ` select * from employees`
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        console.log("response....",response.recordset[0])
        res.status(200).json({status:true,data:response.recordset[0]})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting getEmployess"})
    }
}

const getTasks = async () => {
    try {
        const query = ` select * from tasks`
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        console.log("response....",response.recordset[0])
        res.status(200).json({status:true,data:response.recordset[0]})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting getTasks"})
    }
}
module.exports = {
    getProjects
}
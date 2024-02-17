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

const connectToDB = async (parameters,empId) => {
    console.log("parameters",parameters)
    try {
        const query = `select Id,TaskName,TaskDescription,AssignedByName from tasks where AssignedTold = '${empId}'`
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        let tasksNames = response.recordset
        tasksNames = JSON.stringify(tasksNames)
        return tasksNames
    } catch (error) {
        console.log("Error in connect to DB",error)
        return "Error in connect to DB"
    }
}

module.exports = {
    connectToDB
}
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

var tasksTableName = 'Tasks';

const getTasks = async (req,res) => {
    try {
        const query = ` select * from Tasks`
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        //  console.log("response....",response.recordset)
        res.status(200).json({status:true,data:response.recordset})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting tasks"})
    }
}

const getTasksByEmpId = async (req,res) => {
    try {
        const query = ` select * from Tasks where `
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        // console.log("response....",response.recordset[0])
        res.status(200).json({status:true,data:response.recordset})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting getEmployess"})
    }
}

const getTasksByProjectId = async (req,res) => {
    try {
        const query = ` select * from Tasks where ProjectId='${req.params.projectId}'`
        const pool = await sql.connect(config);
        console.log(query)
        const response = await pool.request().query(query)
        // console.log("response....",response.recordset[0])
        res.status(200).json({status:true,data:response.recordset})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting getEmployess"})
    }
}

const insertTasks = async (req,res) => {
    try {
        if(req.body.length > 0){

        let sqlValuesItems = ``;
        
        req.body.forEach((element, index) => {
            let param_taskName = `taskName${index}`;
            let param_taskDes = `taskDes${index}`;
            let param_taskAsignedByName = `taskAsignedByName${index}`;
            let param_taskAsignedById = `taskAsignedById${index}`;
            let param_taskAsignedToName = `taskAsignedToName${index}`;
            let param_taskAsignedToId = `taskAsignedToId${index}`;
            let param_taskProjectId = `taskProjectId${index}`;
            

            sqlValuesItems = sqlValuesItems + `( '${element.taskName}', '${element.taskDes}', '${element.taskAsignedByName}', '${element.taskAsignedById}',
            '${element.taskAsignedToName}', '${element.taskAsignedToId}', '${element.taskProjectId}', '${element.taskDueDate}')`
            if(index < (req.body.length - 1)) {
                sqlValuesItems = sqlValuesItems + `, `
            }
        });
        let queryString = `
        
        INSERT INTO ${tasksTableName}
        (TaskName, TaskDescription, AssignedByName, AssignedById, AssignedToName, AssignedTold, ProjectId, TaskDueDate)
        VALUES ${sqlValuesItems};
        `;
        
        console.log(queryString);
        const pool = await sql.connect(config)
        // const request = new sql.Request()
        req.body.forEach((element, index) => {
            console.log(element)
            pool.request().input(`taskName${index}`,element.taskName);
            pool.request().input(`taskDes${index}`, element.taskDes);
            pool.request().input(`taskAsignedByName${index}`,  element.taskAsignedByName);
            pool.request().input(`taskAsignedById${index}`,  element.taskAsignedById);
            pool.request().input(`taskAsignedToName${index}`,  element.taskAsignedToName);
            pool.request().input(`taskAsignedToId${index}`,  element.taskAsignedToId);
            pool.request().input(`taskProjectId${index}`,  element.taskProjectId);
        });
        const response = await pool.request().query(queryString)

        // console.log("response....",response.recordset[0])
        res.status(200).json({status:true,data:response.recordset})

        // console.log(request);


    } else {
        console.log("calling API without tasks");
        res.status(400).send({msg: "Tasks not found"});
    }
    } catch (error) {
        console.log("error in getting tasks.....",error)
        return  res.status(500).json({status:false,data:"Error in getting tasks"})
    }

}

const updateTasksById = async (req,res) => {
    try {
        const query = ` select * from Tasks`
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        // console.log("response....",response.recordset[0])
        res.status(200).json({status:true,data:response.recordset})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting getEmployess"})
    }
}

module.exports = {
    getTasks,
    getTasksByEmpId,
    insertTasks,
    updateTasksById,
    getTasksByProjectId
}
const sql = require('mssql')
const { generateText } = require('../utils/generative_ai_services/generateText')
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
        //  console.log("response....",response.recordset)
        res.status(200).json({status:true,data:response.recordset})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting projects"})
    }
}

const getEmployees = async (req,res) => {
    try {
        const query = ` select * from employees`
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        // console.log("response....",response.recordset[0])
        res.status(200).json({status:true,data:response.recordset})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting getEmployess"})
    }
}



const create_project = async (req,res) => {
    console.log("in.......")
    const projectData = req.body.data
    console.log(projectData)
    const projectName = projectData.projectName
    const projectDescription = projectData.projectDescription
    const StartDate = projectData.startDate
    console.log(StartDate)
    const EndDate = projectData.endDate
    const CreatedByName = projectData.createdByName
    const CreatedById = projectData.createdById
    try {
        const query = `Insert into [dbo].[Projects] (ProjectName,ProjectDescription,StartDate,EndDate,
            CreatedByName,CreatedById) output inserted.* values (@ProjectName,@ProjectDescription,@StartDate,@EndDate,
                @CreatedByName,@CreatedById)`
        const pool = await sql.connect(config)
        const response = await pool.request()
        .input("ProjectName",projectName)
        .input("ProjectDescription",projectDescription)
        .input("StartDate",StartDate)
        .input("EndDate",EndDate)
        .input("CreatedByName",CreatedByName)
        .input("CreatedById",CreatedById)
        .query(query)
        console.log("response....",response.recordset[0])
      res.status(200).json({status:true,data:"Project created"})
    } catch (error) {
        console.log("error in getting projects.....",error)
        return  res.status(500).json({status:false,data:"Error in getting create_project"})
    }
}
const generate_techs_from_project_description = async (req,res) => {
    try {
        const projectId = req.params.projectId
        console.log("projectId",projectId)
        const query = `select ProjectDescription from [dbo].[Projects] where Id = '${projectId}'`
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        const projectDescription = response.recordset[0].ProjectDescription
        // console.log("projectDescription",projectDescription)
        let systemPrompt = `You are a helpful assistant. Your role is to estimate the skills like react,node,express but not technologies like web-based applications required by developers based on description
        you response should be in a json format like this only with relevant skills:
        {technologies:[react,node,express]}
        `
        var  responsesNames = await generateText(systemPrompt,projectDescription)
        responsesNames = JSON.parse(responsesNames.data).technologies
         return res.status(200).json({status:true,data:responsesNames})
    } catch (error) {
        console.log("Error in generateTechs",error)
        return res.status(500).json({status:false,data:"Error in generateTechs"})
    }
}

const ai_assign = async (req,res) => {
    try {
        const assignData = req.body.data
        const No_of_employees = assignData.No_of_employees
        const projectId = assignData.projectId
        var requiredSkills = assignData.requiredSkills
        // console.log("requiredSkills",requiredSkills)
        let demo = ''
        for (let i =0; i<requiredSkills.length; i++){
            demo = demo + `SkillSet LIKE '%${requiredSkills[i]}%' OR `
        }
        demo = demo.trim().slice(0,-2)
        // const query = `SELECT * 
        // FROM [dbo].[Employees] 
        // WHERE ${demo}`

       let query =  `begin transaction
        SELECT * 
        FROM [dbo].[Employees] 
        WHERE ${demo}
        select ProjectDescription from [dbo].[Projects] where Id = '${projectId}'
        commit transaction`

        // console.log("query",query)
        const pool = await sql.connect(config)
        const response = await pool.request().query(query)
        let projetDescription = response.recordsets[1][0].ProjectDescription
        let employeeList = response.recordsets[0]
        employeeList = JSON.stringify(employeeList)
        // return res.send("ok")
        var systemPrompt = `You are a helpful assistant. Your role is to find the relevant candidates to assign in to a 
        project for work by considering the following information.
        This is the project description : ${projetDescription}.
        The employees available in my office or the employees list provided in the user role.
        Please select the suitable employees from the employeesList and give back the suitable employees to work in that project
        by considering the employees skillSet provided to you.
        The response type should be only the employee Id's only.
        And the response should should be in json format like this,
        Example: {EmployeesList:{[EmployeeId1,EmployeeId2....]
            OutPut employees Required Count = ${No_of_employees}
        `
        let responsesNames = await generateText(systemPrompt,employeeList)
        const Employees = JSON.parse(responsesNames.data)
        // responsesNames = JSON.parse(responsesNames)
        return res.status(200).json({status:true,data:Employees.EmployeesList})
    } catch (error) {
        console.log("error in ai asign",error)
        return res.status(500).json({status:false,data:"Error in the ai assign"})
    }
}
module.exports = {
    getProjects,
    getEmployees,
    generate_techs_from_project_description,
    create_project,
    ai_assign
}
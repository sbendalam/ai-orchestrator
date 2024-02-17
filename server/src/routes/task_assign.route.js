const {getProjects, getEmployees, generate_techs_from_project_description,create_project, ai_assign } = require("../controllers/task.Controller")

module.exports = (app) => {
   
    app.route('/getprojects').get(getProjects)
    app.route('/getemployees').get(getEmployees)
    app.route("/generatetech/:projectId").get(generate_techs_from_project_description)
    app.route("/addproject").post(create_project)
    app.route("/aiassign").post(ai_assign)
}
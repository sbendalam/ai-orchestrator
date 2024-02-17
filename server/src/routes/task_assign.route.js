const { sendmail } = require("../controllers/send_remainder.controller")
const { task_assign, getProjects } = require("../controllers/task.Controller")

module.exports = (app) => {
   
    app.route('/getprojects').get(getProjects)
}
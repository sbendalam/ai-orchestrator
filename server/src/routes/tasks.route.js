const { insertTasks, getTasks, getTasksByProjectId } = require("../controllers/tasks.controller")

module.exports = (app) => {
   
    app.route('/tasks').post(insertTasks).get(getTasks);
    app.route('/task/:projectId').get(getTasksByProjectId);
}
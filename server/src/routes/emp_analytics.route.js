const { emp_analytics } = require("../controllers/emp_analytics.controller")

module.exports = (app) => {
    app.route('/path').post(emp_analytics)
}
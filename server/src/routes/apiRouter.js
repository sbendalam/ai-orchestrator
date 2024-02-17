const express = require("express");
var multer = require("multer");
const upload = multer();
const bodyParser = require("body-parser");
const { sendmail } = require("../controllers/send_remainder.controller");
// const apiRouter = express
// apiRouter.use(upload.any(), jsonParser, (req, res, next) => {
//   return next();
// });
// apiRouter.route('sendfile').get(sendmail)
//  apiRouter.route('/sendmail').get(sendmail)
// require('./emp_analytics.route')(apiRouter)
// require("./make_chat.route")(apiRouter)
// require('./task_assign.route')(apiRouter)
const apiRouter = express.Router()
apiRouter.route('/sendmail').get(sendmail)
require('./task_assign.route')(apiRouter)
module.exports= apiRouter;

const express = require("express");
var multer = require("multer");
const upload = multer();
const bodyParser = require("body-parser");
const { sendmail } = require("../controllers/send_remainder.controller");


const apiRouter = express.Router()
require('./task_assign.route')(apiRouter)
require('./tasks.route')(apiRouter)
require('./make_chat.route')(apiRouter)
module.exports= apiRouter;

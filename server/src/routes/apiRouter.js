const express = require("express");
const testController = require("../controllers/taskAssign.Controller");

const apiRouter = express.Router();

// apiRouter.get("/test", testController.getFromTest);
// apiRouter.post("/test", testController.postEcho);

module.exports = apiRouter;

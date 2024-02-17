const express = require("express");
const testController = require("../controllers/testController");

const apiRouter = express.Router();

apiRouter.get("/test", testController.getFromTest);
apiRouter.post("/test", testController.postEcho);

module.exports = apiRouter;

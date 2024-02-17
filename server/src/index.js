require("dotenv").config();
const express = require("express")
const PORT = process.env.PORT || 3001;
const path = require("path");
const apiRouter = require("./routes/apiRouter");

// Initializing function creates an Express application.
const app = express();

//Middleware to parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json())

//Configuring express to serve frontend
app.use(express.static(path.resolve(__dirname, "../../publish")));

//Initializing CORS Options change before prod to accept necessary origins only
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

//routing all /ai routes to main
app.use("/api", apiRouter);

//Redirecting all remaining requests to frontend
app.get("*", function (req, res) {

  res.sendFile('index.html',{root: path.resolve(__dirname, "../../publish")});
});
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
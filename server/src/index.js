require("dotenv").config();
const sql = require('mssql')
const express = require("express")
const PORT = process.env.PORT || 3001;
const path = require("path");
const apiRouter = require("./routes/apiRouter");

const app = express();

app.use(express.json())

app.use(express.static(path.resolve(__dirname, "../../publish")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

app.use("/api", apiRouter);

app.get("*", function (req, res) {

  res.sendFile('index.html',{root: path.resolve(__dirname, "../../publish")});
});

const config = {
  server : process.env.SERVER,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database:process.env.DATABASE
}

const pool = sql.connect(config).then(() => {
  console.log("DB Connected")
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
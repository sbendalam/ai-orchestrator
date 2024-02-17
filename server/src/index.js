require("dotenv").config();
const sql = require('mssql')
const express = require("express")
const PORT = process.env.PORT || 3001;
const path = require("path");
const apiRouter = require("./routes/apiRouter");
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, "../../publish")));
app.use("/api", apiRouter);
console.log("In index")
// 


// app.get("*", function (req, res) {

//   res.sendFile('index.html',{root: path.resolve(__dirname, "../../publish")});
// });


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
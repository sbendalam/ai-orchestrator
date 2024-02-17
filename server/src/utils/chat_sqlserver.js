const sql = require('mssql')
const dotenv = require('dotenv').config()
const config = {
    server: process.env.DB_USER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    connectionTimeout : JSON.parse(process.env.DB_CONNECTION_TIMEOUT_VALUE),
    options: {
      encrypt: true,
    },
  };
  const createSession = async (loginData) => {
    try {
        var UserId = loginData.UserId
        var currentdate = new Date();
        let currentDate =
          currentdate.getFullYear() +
          "-" +
          (currentdate.getMonth() + 1) +
          "-" +
          currentdate.getDate() +
          " " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          ":" +
          currentdate.getSeconds();
        const pool = await sql.connect(config);
        // console.log("database connected...");
        const query = `insert into [dbo].[sessions] (userId,sessionTime) 
                       output inserted.* values  (@userId,@sessionTime)`;
        const tablesdata = await pool
          .request()
          .input('userId',UserId)
          .input('sessionTime',currentDate)
          .query(query);
        sql.close()
        return tablesdata
    } catch (error) {
        console.log("Error.....",error)
        return error
    }
   
}
module.exports.createSession = createSession

const createSessionHistory = async (sessionId,prompt,response11,functionAssistant,functionName,functionResponse) => {
  try {

    var currentdate = new Date();
    let currentDate =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
      const pool = await sql.connect(config);
      // console.log("database connected...");
      const query = `insert into [dbo].[sessionHistory] (sessionId,userPrompt,response,functionAssistant,functionName,functionResponse,
                     messageTime) values (@sessionId,@userPrompt,@response,@functionAssistant,@functionName,@functionResponse,@messageTime)`;
      const tablesdata = await pool
        .request()
        .input('sessionId',sessionId)
        .input('userPrompt',prompt)
        .input('response',response11)
        .input('functionAssistant',functionAssistant)
        .input('functionName',functionName)
        .input('functionResponse',functionResponse)
        .input('messageTime',currentDate)
        .query(query);
      sql.close()
      return 'success'
  } catch (error) {
      console.log("Error.....createSessionHistory",error)
      return error
  }
 
}
module.exports.createSessionHistory = createSessionHistory


const getMessagesFromSessionHistory = async (sessionId) => {
    try {
        
        const pool = await sql.connect(config);
        // console.log("database connected...");
        const query = `select * from [dbo].[sessionHistory] where sessionId = '${sessionId}' order by messageTime desc`;
        const tablesdata = await pool
          .request()
          .query(query);
          // console.log("previousChat",tablesdata.recordset)
        sql.close()
        return tablesdata.recordset
    } catch (error) {
        console.log("Error.....",error)
        return error
    }
   
}
module.exports.getMessagesFromSessionHistory = getMessagesFromSessionHistory

const updateDbMessages = async () => {
    try { 
        const pool = await sql.connect(config);
        // console.log("database connected...");
        const query = `update [dbo].[conversation] set messages = '${JSON.stringify(messages)}' where Id ='6b5bfb1e-83ff-49ac-86c2-0c31fdb6ed20'`;
        const tablesdata = await pool
          .request()
          .query(query);
        // console.log(tablesdata)
        sql.close()
    } catch (error) {
        console.log("Error in update....", error)
    }
}
module.exports.updateDbMessages = updateDbMessages

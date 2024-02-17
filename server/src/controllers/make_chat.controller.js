require("dotenv").config();
const {
  getMessagesFromSessionHistory,
  createSessionHistory,
} = require("../utils/chatServices/chatFiles");
const {
  functionCall,
} = require("../utils/generative_ai_services/chat_services");
const {connectToDB} = require('../utils/connect_to_db')
const sql = require("mssql");
const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  connectionTimeout: JSON.parse(process.env.DB_CONNECTION_TIMEOUT_VALUE),
  options: {
    encrypt: true,
  },
};
const createChat = async (req, res) => {
  try {
    var employId = req.params.employId;
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
    const query = `insert into [dbo].[sessions] (employId,sessionTime) 
                               output inserted.* values  (@employId,@sessionTime)`;
    const tablesdata = await pool
      .request()
      .input("employId", employId)
      .input("sessionTime", currentDate)
      .query(query);
    console.log(tablesdata);
    return res.status(200).json({ status: true, data: tablesdata.recordset });
  } catch (error) {
    console.log("Error.....", error);
    return res.status(500).json({ status: false, data: "Data Insert failed" });
  }
};
const make_chat = async (req, res) => {
  try {
    const data = req.body.data;
    const empId = data.empId;
    const sessionId = data.sessionId;
    const prompt = data.prompt;

    var functionAssistant = "";
    var functionResponse = "";
    var functionName = "";
    var response11 = "";
    var messages = [
      {
        role: "system",
        content: `Your are helpful assistant in a software company. Your Role is to answer for the employees questions,
                And if employ ask for his what are the tasks assign to him then you have to call the relevant function described
                functions array`,
      },
    ];
    var previousChat = await getMessagesFromSessionHistory(sessionId);
    var previosmessagesArray = [];
    if (previousChat) {
      for (let i = previousChat.length - 1; i >= 0; i--) {
        var userRole = { role: "user", content: "" };
        var assistantRole = { role: "assistant", content: "" };
        var functionAssistant11 = {
          role: "assistant",
          function_call: "",
          content: null,
        };
        var functionResponse1 = { role: "function", name: "", content: "" };
        if (previousChat[i].userPrompt) {
          userRole.content = previousChat[i].userPrompt;
          previosmessagesArray.push(userRole);
        }
        if (previousChat[i].functionAssistant) {
          functionAssistant11.function_call = JSON.parse(
            previousChat[i].functionAssistant
          );
          previosmessagesArray.push(functionAssistant11);
        }
        if (previousChat[i].functionResponse) {
          functionResponse1.name = previousChat[i].functionName;
          functionResponse1.content = previousChat[i].functionResponse;
          previosmessagesArray.push(functionResponse1);
        }
        if (previousChat[i].response) {
          assistantRole.content = previousChat[i].response;
          previosmessagesArray.push(assistantRole);
        }
      }
      messages.push(...previosmessagesArray);
    }
    // console.log("previosmessagesArray",previosmessagesArray)
    messages.push({
      role: "user",
      content: prompt,
    });
    // console.log("Messages......",messages)
    var response = await functionCall(messages);
    if (response.content) {
      response11 = response.content;
    }
    if (response.function_call) {
      if (response.function_call.name) {
        var callingFunction = response.function_call.name;
        if (callingFunction === "connectToDB") {
          let functionArguments = JSON.parse(response.function_call.arguments);
          var functionResponse22 = await connectToDB(functionArguments,empId);
          console.log("functionResponse22",functionResponse22)
          response["content"] = null;
          messages.push(response);
          messages.push({
            role: "function",
            name: callingFunction,
            content: functionResponse22,
          });
        }
        var Secondresponse = await functionCall(messages);
        functionAssistant = JSON.stringify(response.function_call);
        functionName = callingFunction;
        functionResponse = functionResponse22;
        response11 = Secondresponse.content;
      }
    }
    var resp = await createSessionHistory(
      sessionId,
      prompt,
      response11,
      functionAssistant,
      functionName,
      functionResponse
    );
  
    return res.status(200).json({status:true,data:response11})
  } catch (error) {
    console.log("Error in task assign");
    res.status(500).json({ status: false, data: "Error in makeChat" });
  }
};

module.exports = {
  make_chat,
  createChat,
};

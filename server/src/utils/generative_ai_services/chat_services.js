const axios = require("axios");
const functionCall = async (messages) => {
      console.log("messages......",messages)
  var functions = [
    {
      name: "connectToDB",
      description: `This connectToDB function is used to call the database when user user asked for the his task assigned status`,
      parameters: {
        type: "object",
        properties: {
        },
        required: [],
      },
    },
  ];
  try {
    let data = JSON.stringify({
      messages: messages,
      functions: functions,
      function_call: "auto",
      max_tokens: 1000,
      temperature: 0,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.AZURE_ENDPOINT}/openai/deployments/${process.env.AZURE_DEPLOYMENT_MODEL}/chat/completions?api-version=2023-07-01-preview`,
      headers: {
        "api-key": process.env.AZURE_API_KEY,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("response.........", response.data.choices[0].message);
    return response.data.choices[0].message;
  } catch (error) {
    console.log("error.........", error.response.data);
    return error.response.data;
  }
};

module.exports = {functionCall}

const axios = require('axios');
const generateText = async (systemprompt,description) => {
    try {

let data = JSON.stringify({
  "messages": [
    {
        "role": "system",
        "content": systemprompt
    },
    {
        "role":"user",
        "content":description
    }
  ],
  "max_tokens": 100,
  "temperature":0
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${process.env.AZURE_ENDPOINT}/openai/deployments/${process.env.AZURE_DEPLOYMENT_MODEL}/chat/completions?api-version=2023-07-01-preview`,
  headers: { 
    'Content-Type': 'application/json', 
    'api-key': process.env.AZURE_API_KEY
  },
  data : data
};

const response = await axios.request(config)
 console.log("response",response.data.choices[0].message)
return {status:true, data:response.data.choices[0].message.content}
    } catch (error) {
        console.log("Error in Generate Text",error.response.data)
        return {status:false, data:"Error in Generate Text"}
    }
}

module.exports = {
    generateText
}
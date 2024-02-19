import axios from "axios";
export const API = {
  get: {
    getTasks: async (description) => {
      let data = JSON.stringify({
        query: description,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://172.17.10.70:3003/api/wrapper?projectId=F21E83AF-4E50-4716-BCC7-E41AA0769DC4&endpointName=getTasks",
        headers: {
          "Content-Type": "application/json",
          accesskey: import.meta.env.VITE_ACCESSKEY,
        },
        data: data,
      };

      try {
        const response = await axios.request(config);

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getTasksById: async (projectId) => {
      try {
        const response = await axios.get(
          `http://172.17.10.70:3000/api/task/${projectId}`
        );

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getProject: async () => {
      try {
        const response = await axios.get(
          "http://172.17.10.70:3000/api/getprojects"
        );

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getSkillsByProjectId: async (projectId) => {
      try {
        const response = await axios.get(
          `http://172.17.10.70:3000/api/generatetech/${projectId}`
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    getEmployess: async () => {
      try {
        const response = await axios.get(
          `http://172.17.10.70:3000/api/getemployees`
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    sendMails: async (ids) => {
      try {
        const response = await axios.post(
          `http://172.17.10.70:3000/api/sendremainder`,
          {
            data: {
              empId: ids,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    createChat: async () => {
      try {
        const response = await axios.get(
          `http://172.17.10.70:3000/api/createchat/A285F43C-C84E-4564-B357-48F81FC8DA2C`
        );

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  post: {
    addProject: async (projectDetails) => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://172.17.10.70:3000/api/addproject",
        headers: {
          "Content-Type": "application/json",
        },
        data: { data: projectDetails },
      };
      axios.request(config);
    },
    addTasks: async (taskDetails) => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://172.17.10.70:3000/api/tasks",
        headers: {
          "Content-Type": "application/json",
        },
        data: taskDetails,
      };
      let response = await axios.request(config);
      return response;
    },
    chat: async (prompt) => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://172.17.10.70:3000/api/makechat",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          data: {
            empId: "A285F43C-C84E-4564-B357-48F81FC8DA2C",
            sessionId: localStorage.getItem("sessionId"),
            prompt: prompt,
          },
        },
      };
      let response = await axios.request(config);
      return response;
    },
  },
};

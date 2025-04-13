import axios from "axios";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.response.use(async (response) => {
  try {
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
});

export default agent;

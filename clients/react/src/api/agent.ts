import axios from 'axios';
import { toast } from 'react-toastify';

const agent = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

agent.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        throw data;
        break;
      case 401: {
        const controller = new AbortController();
        controller.abort();
        // toast.error('Unauthorized');
        break;
      }
      case 404:
        toast.error('Not found');
        break;
      case 500:
        toast.error('Internal server error');
        break;
    }
  }
);

export default agent;

'client only';

import axios from 'axios';

const clientAgent = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export default clientAgent;

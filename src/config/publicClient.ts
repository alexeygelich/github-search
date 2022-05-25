import axios from 'axios';

export const publicClient = axios.create();

publicClient.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

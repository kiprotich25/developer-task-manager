import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use(cfg => { //attaches jwt automatically
    const token = localStorage.getItem("token");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

export default API;
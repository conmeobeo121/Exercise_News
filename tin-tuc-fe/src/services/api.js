import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    auth: {
        username: 'user',
        password: 'leKin123'
    }
});

export default api;
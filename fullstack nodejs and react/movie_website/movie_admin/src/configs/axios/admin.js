import axios from 'axios';
const axiosAdminInstance = axios.create({
    baseURL: 'http://localhost:5000/api/admin',
    // baseURL: 'https://movie-website-q7f0.onrender.com/api/admin',
    withCredentials: true
});

export default axiosAdminInstance;
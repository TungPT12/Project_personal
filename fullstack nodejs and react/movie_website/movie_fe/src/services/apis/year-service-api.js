import axiosInstance from '../../configs/axios';

const getAllYearAPI = async () => {
    try {
        const response = await axiosInstance.get('/year');
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getAllYearAPI,
}
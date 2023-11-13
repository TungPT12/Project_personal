import axiosInstance from '../../configs/axios';

const getAllLanguageAPI = async () => {
    try {
        const response = await axiosInstance.get('/language');
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getAllLanguageAPI,
}
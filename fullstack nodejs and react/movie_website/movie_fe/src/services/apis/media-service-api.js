import axiosInstance from '../../configs/axios';

const getAllMediaAPI = async () => {
    try {
        const response = await axiosInstance.get('/media');
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getAllMediaAPI,
}
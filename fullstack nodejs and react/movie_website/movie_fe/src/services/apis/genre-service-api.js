import axiosInstance from '../../configs/axios';

const getAllGenresAPI = async () => {
    try {
        const response = await axiosInstance.get('/genres');
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getAllGenresAPI,
}
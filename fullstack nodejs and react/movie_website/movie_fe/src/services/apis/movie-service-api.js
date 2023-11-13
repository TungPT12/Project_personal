import axiosInstance from '../../configs/axios';


const getMoviesAPI = async (router) => {
    try {
        const response = await axiosInstance.get(router);
        return response;
    } catch (error) {
        return error.response;
    }
}

const getMovieVideoAPI = async (id) => {
    try {
        const response = await axiosInstance.post('/video', { film_id: id });
        return response;
    } catch (error) {
        return error.response;
    }
}

const searchMoviesAPI = async (keyword, page, filterParams) => {
    try {
        const response = await axiosInstance.post('/search', {
            keyword: keyword,
            page: page ? page : 1,
            ...filterParams
        })
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getMoviesAPI,
    getMovieVideoAPI,
    searchMoviesAPI
}
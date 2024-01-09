import axiosAdminInstance from "../configs/axios/admin";
import setHeaders from "../utils/setHeaders";

const getMoviesApi = async (token) => {
    try {
        const response = await axiosAdminInstance.get(`/movies`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const getMoviesShowing = async (token) => {
    try {
        const response = await axiosAdminInstance.get(`/movies-showing`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const createMovieShowing = async (token, movieShowing) => {
    try {
        const response = await axiosAdminInstance.post('/movie-showing', movieShowing, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

// const updateCategoryByIdAdminApi = async (token, category, id) => {
//     try {
//         const response = await axiosAdminInstance.put(`/category/${id}`, category, setHeaders(token));
//         return response;
//     } catch (error) {
//         return error.response;
//     }
// }

// const deleteCategoryAdminApi = async (token, id) => {
//     try {
//         const response = await axiosAdminInstance.delete(`/category/${id}`, setHeaders(token));
//         return response;
//     } catch (error) {
//         return error.response;
//     }
// }

export {
    getMoviesApi,
    createMovieShowing,
    getMoviesShowing
    // getCategoryByIdAdminApi,
    // updateCategoryByIdAdminApi,
    // deleteCategoryAdminApi
}
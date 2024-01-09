import axiosAdminInstance from "../configs/axios/admin";
import setHeaders from "../utils/setHeaders";

const getCategoriesAdminApi = async (token, page) => {
    try {
        const response = await axiosAdminInstance.get(`/categories?page=${page}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}
const getCategoryByIdAdminApi = async (token, id) => {
    try {
        const response = await axiosAdminInstance.get(`/category/${id}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const createCategoryAdminApi = async (token, category) => {
    try {
        const response = await axiosAdminInstance.post('/category', category, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const updateCategoryByIdAdminApi = async (token, category, id) => {
    try {
        const response = await axiosAdminInstance.put(`/category/${id}`, category, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const deleteCategoryAdminApi = async (token, id) => {
    try {
        const response = await axiosAdminInstance.delete(`/category/${id}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getCategoriesAdminApi,
    createCategoryAdminApi,
    getCategoryByIdAdminApi,
    updateCategoryByIdAdminApi,
    deleteCategoryAdminApi
}
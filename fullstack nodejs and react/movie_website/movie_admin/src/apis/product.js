import axiosAdminInstance from "../configs/axios/admin";
import setHeaders from "../utils/setHeaders";

const getProductsAdminApi = async (token) => {
    try {
        const response = await axiosAdminInstance.get(`/products`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const createProductAdminApi = async (token, product) => {
    try {
        const response = await axiosAdminInstance.post('/product', product, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const getProductByIdAdminApi = async (token, id) => {
    try {
        const response = await axiosAdminInstance.get(`/product/${id}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const disableHotelAdminApi = async (token, id) => {
    try {
        const response = await axiosAdminInstance.delete(`/hotel/${id}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}


const updateProductByIdAdminApi = async (token, product) => {
    try {
        const response = await axiosAdminInstance.put(`/product/${product.id}`, product, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const deleteProductByIdAdminApi = async (token, id) => {
    try {
        const response = await axiosAdminInstance.delete(`/product/${id}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}


export {
    getProductsAdminApi,
    createProductAdminApi,
    // disableHotelAdminApi,
    getProductByIdAdminApi,
    updateProductByIdAdminApi,
    deleteProductByIdAdminApi,
}
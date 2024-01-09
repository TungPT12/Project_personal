import axiosAdminInstance from "../configs/axios/admin";

const signin = async (email, password) => {
    try {
        const response = await axiosAdminInstance.post('/signin', {
            email: email,
            password: password
        });
        return response
    } catch (error) {
        return error.response;
    }
}

const checkIsLoginApi = async () => {
    try {
        const response = await axiosAdminInstance.post('/access-token')
        return response
    } catch (error) {
        return error.response;
    }
}

const logoutApi = async () => {
    try {
        const response = await axiosAdminInstance.post('/logout')
        return response
    } catch (error) {
        return error.response;
    }
}

export {
    signin,
    checkIsLoginApi,
    logoutApi,
}
import { createSlice } from "@reduxjs/toolkit";

const initAuthn = {
    token: '',
    _id: '',
    email: '',
    fullName: '',
    isAdmin: '',
    phoneNumber: '',
    avatar: '',
    isAuthn: false,
}

const authnSlice = createSlice({
    name: "Authentication",
    initialState: initAuthn,
    reducers: {
        login(state, payload) {
            const user = payload.payload;
            state.token = user.token;
            state.isAuthn = true;
            state._id = user._id;
            state.email = user.email;
            state.fullName = user.fullName;
            state.isAdmin = user.isAdmin;
            state.phoneNumber = user.phoneNumber;
            state.avatar = user.avatar;
            state.isCounselor = user.isCounselor
        },
        logout(state) {
            // state.token = '';
            // state._id = '';
            // state.email = '';
            // state.fullName = '';
            // state.isAdmin = '';
            // state.phoneNumber = '';
            // state.avatar = '';
            state.isAuthn = false;
        },
        // setUser(state, payload) {
        //     const user = payload.payload;
        //     state.isAuthn = true;
        //     state._id = user._id;
        //     state.email = user.email;
        //     state.fullName = user.fullName;
        //     state.isAdmin = user.isAdmin;
        //     state.phoneNumber = user.phoneNumber;
        //     state.username = user.username;
        //     state.avatar = user.avatar;
        // }
    }
})

const authnReducer = authnSlice.reducer;
const authnAction = authnSlice.actions;

export default authnReducer;

export {
    authnAction
}
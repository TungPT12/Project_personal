import { combineReducers } from "redux";
import authnReducer from "./slice/authn";
import { configureStore } from "@reduxjs/toolkit";

const allReducers = combineReducers({
    authn: authnReducer
})

const store = configureStore({
    reducer: allReducers
})

export default store;
import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../Features/userSlice";

export default configureStore({
  reducer: {
    user: useReducer,
  },
});
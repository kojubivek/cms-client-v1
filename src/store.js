import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./pages/login/authSlice";
import catReducer from "./pages/category/categorySlice";
import systemReducer from "./system/systemSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
    category: catReducer,
    system: systemReducer,
  },
});

export default store;

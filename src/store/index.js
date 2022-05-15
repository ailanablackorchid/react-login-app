import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth";
import { userReducer } from "./reducers/users";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export const store = configureStore({ reducer: rootReducer });

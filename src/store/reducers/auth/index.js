const initialState = {
  token: null,
  isLoggedIn: false,
  error: "",
};

const SET_TOKEN = "SET_TOKEN";
const SET_ERROR = "SET_ERROR";
const SET_IS_LOGGED = "SET_IS_LOGGED";

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_IS_LOGGED:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};

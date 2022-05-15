const initialState = {
  users: [],
};

const ADD_USER = "ADD_USER";
const ADD_MANY_USERS = "ADD_MANY_USERD";
const EDIT_USERS = "EDIT_USERS";
const DELETE_USER = "DELETE_USER";

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case ADD_MANY_USERS:
      return { ...state, users: [...state.users, ...action.payload] };
    default:
      return state;
  }
};

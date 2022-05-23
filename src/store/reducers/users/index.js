const initialState = {
  users: [],
  current_page: 1,
  per_page: 6,
  total: 0,
  total_pages: 0,
  userIds: {},
};

const ADD_USER = "ADD_USER";
const ADD_MANY_USERS = "ADD_MANY_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PAGES_TOTAL = "SET_PAGES_TOTAL";
const EDIT_USER = "EDIT_USER";
const SEARCH_USER = "SEARCH_USER";
const DELETE_USER = "DELETE_USER";

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      console.log("ADD USER");
      console.log(state.users);
      console.log(action.payload);
      const IdAdd = {};
      IdAdd[action.payload.id] = true;
      return {
        ...state,
        users: [...state.users, action.payload],
        userIds: { ...state.userIds, ...IdAdd },
      };
    case SET_CURRENT_PAGE:
      return { ...state, current_page: action.payload };
    case SET_PAGES_TOTAL:
      return {
        ...state,
        total_pages: action.payload,
      };
    case ADD_MANY_USERS:
      const result = action.payload.filter(
        (newuser) => !state.users.some((user) => newuser.id === user.id)
      );
      const idResult = {};
      result.forEach((user) => {
        idResult[user.id] = true;
      });
      return {
        ...state,
        users: [...state.users, ...result],
        userIds: { ...state.userIds, ...idResult },
      };
    case EDIT_USER:
      const resultEdit = state.users.map((user) => {
        if (user.id === action.payload.id) {
          const editedUser = {
            ...user,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            email: action.payload.email,
          };
          return editedUser;
        } else {
          return user;
        }
      });
      console.log(resultEdit);
      return { ...state, users: resultEdit };
    default:
      return state;
  }
};

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
const SEARCH_USER = "SEARCH_USER";
const EDIT_USERS = "EDIT_USERS";
const DELETE_USER = "DELETE_USER";

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        userIds: (state.userIds[action.payload.id] = true),
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
      return { ...state, users: [...state.users, ...result] };

    default:
      return state;
  }
};

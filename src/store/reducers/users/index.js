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
      // const alredyin = [...state.users];
      // const newValues = [...action.payload];
      // const filteredNewValues = newValues.filter(
      //   (user) => user.id in state.userIds
      // );

      // newValues.forEach((user) => {
      //   if (alredyin.indexOf(user) === -1) {
      //     console.log("indexOF");
      //     console.log(user);
      //     console.log(alredyin.indexOf(user));
      //     alredyin.push(user);
      //   }
      // });
      // console.log("NewValues");
      // console.log(newValues);

      // console.log("AlreadyIN");
      // console.log(alredyin);

      // return { ...state, users: [...alredyin, ...filteredNewValues] };
      action.payload.forEach((user) => {
        state.userIds[user.id] = true;
      });

      return { ...state, users: [...state.users, ...action.payload] };
    default:
      return state;
  }
};

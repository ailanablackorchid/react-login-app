import EditUser from "../pages/EditUser";
import Login from "../pages/Login";
import UserList from "../pages/UserList";
import CreateUser from "../pages/CreateUser";

export const publicRoutes = [
  { path: "/login", element: <Login />, exact: false },
];

export const privateRoutes = [
  { path: "/users", element: <UserList />, exact: false },
  { path: "/edit", element: <EditUser />, exact: false },
  { path: "/create", element: <CreateUser />, exact: false },
];

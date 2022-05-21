import EditForm from "../pages/EditForm";
import Login from "../pages/Login";
import UserList from "../pages/UserList";

export const publicRoutes = [
  { path: "/login", element: <Login />, exact: false },
];

export const privateRoutes = [
  { path: "/users", element: <UserList />, exact: false },
  { path: "/edit", element: <EditForm />, exact: false },
];

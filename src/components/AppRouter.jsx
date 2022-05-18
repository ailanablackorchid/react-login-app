import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";

function AppRouter(props) {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = window.localStorage.getItem("authToken");

    if (authToken) {
      dispatch({ type: "SET_IS_LOGGED", payload: true });
    }
  }, [token, dispatch]);

  return isLoggedIn ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          element={route.element}
          key={route.path}
        />
      ))}
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  ) : (
    <>
      <div>eve.holt@reqres.in</div>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            path={route.path}
            exact={route.exact}
            element={route.element}
            key={route.path}
          />
        ))}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default AppRouter;

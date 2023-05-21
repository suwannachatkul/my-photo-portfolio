import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { stateAuthToken, stateIsAuth } from "../store/authSlice";

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useSelector(stateIsAuth);
  const token = useSelector(stateAuthToken);

  return isAuth && token ? (
    <Outlet />
  ) : (
    <Navigate to="/Error" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;

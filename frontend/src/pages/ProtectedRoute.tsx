import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
  stateAuthToken,
  stateIsAuth,
  refreshAccessToken,
} from "../store/authSlice";
import { useAppDispatch } from "../store/store";

const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

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

import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
  stateAuthProcessState,
  stateAuthToken,
  stateIsAuth,
  refreshAccessToken,
} from "../store/authSlice";
import { useAppDispatch } from "../store/store";
import LoadingFullPage from "../components/UI/LoadingFullPage";
import { getCookie } from "../shared/util/cookiesUtils";

const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const IsRefreshTokenAvailable = getCookie("IsRefreshTokenAvailable");
    if (IsRefreshTokenAvailable) {
      dispatch(refreshAccessToken());
    }
  }, [dispatch]);

  const location = useLocation();
  const isAuth = useSelector(stateIsAuth);
  const token = useSelector(stateAuthToken);
  const authProcessState = useSelector(stateAuthProcessState);

  if (authProcessState === "pending" || authProcessState === "init") {
    throw Promise.resolve(); // Throw a promise to suspend rendering
  }

  return isAuth && token ? (
    <Outlet />
  ) : (
    <Navigate to="/Error" replace state={{ from: location }} />
  );
};

const ProtectedRoutesWrapper = () => {
  return (
    <Suspense fallback={<LoadingFullPage />}>
      <ProtectedRoutes />
    </Suspense>
  );
};

export default ProtectedRoutesWrapper;

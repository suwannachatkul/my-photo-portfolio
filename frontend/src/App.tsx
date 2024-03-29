import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";
import ContactPage from "./pages/Contact";
import ErrorPage from "./pages/Error";
import GalleryPage, { loader as GalleryLoader } from "./pages/Gallery";
import GalleryRoot from "./pages/GalleryRoot";
import GalleryUpload from "./pages/GalleryUpload";
import HomePage, { loader as HomeLoader } from "./pages/Home";
import ProtectedRoutes from "./pages/ProtectedRoute";
import store from "./store/store";
import { refreshAccessToken } from "./store/authSlice";
import { useEffect } from "react";
import { getCookie } from "./shared/util/cookiesUtils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/home" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: HomeLoader,
  },
  {
    path: "gallery",
    element: <GalleryRoot />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <GalleryPage />, loader: GalleryLoader },
      {
        path: "upload",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <GalleryUpload /> }],
      },
    ],
  },
  { path: "contact", element: <ContactPage />, errorElement: <ErrorPage />, },
  { path: "blog", element: <ErrorPage errType="ComingSoon" />, errorElement: <ErrorPage />, },
  { path: "*", element: <ErrorPage errType="NotFound" /> },
]);

function App() {
  // init login state by refreshAccessToken in case serverside cookies available
  useEffect(() =>  {
    const IsRefreshTokenAvailable = getCookie("IsRefreshTokenAvailable");
    if (IsRefreshTokenAvailable) {
      store.dispatch(refreshAccessToken())
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";
import ComingSoonPage from "./pages/ComingSoon";
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
    children: [
      { index: true, element: <GalleryPage />, loader: GalleryLoader },
      {
        path: "upload",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <GalleryUpload /> }],
      },
    ],
  },
  { path: "contact", element: <ContactPage /> },
  { path: "blog", element: <ComingSoonPage /> },
  { path: "*", element: <ErrorPage /> },
]);

function App() {
  // init login state by refreshAccessToken in case serverside cookies available
  useEffect(() =>  {store.dispatch(refreshAccessToken())}, []);

  return <RouterProvider router={router} />;
}

export default App;

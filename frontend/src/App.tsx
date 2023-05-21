import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import ComingSoonPage from "./pages/ComingSoon";
import ContactPage from "./pages/Contact";
import ErrorPage from "./pages/Error";
import GalleryPage, { loader as GalleryLoader } from "./pages/Gallery";
import GalleryRoot from "./pages/GalleryRoot";
import GalleryUpload from "./pages/GalleryUpload";
import HomePage, { loader as HomeLoader } from "./pages/Home";
// import LoginPage from "./pages/Login";
import ProtectedRoutes from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: HomeLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
    ],
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
  return <RouterProvider router={router} />;
}

export default App;

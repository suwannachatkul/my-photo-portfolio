
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";

import ErrorPage from "./pages/Error";
import GalleryPage, {loader as GalleryLoader} from './pages/Gallery';
import HomePage, {loader as HomeLoader} from "./pages/Home";


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: HomeLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
    ]
  },
  { path: 'gallery', element: <GalleryPage />, loader: GalleryLoader },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;

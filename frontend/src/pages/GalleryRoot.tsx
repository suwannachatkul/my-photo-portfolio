import { Outlet } from "react-router-dom";

import Footer from "../components/UI/Footer";
import Header from "../components/UI/Header";

const GalleryRoot = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default GalleryRoot;

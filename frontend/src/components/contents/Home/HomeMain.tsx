import { useEffect, useState, useRef } from "react";

import useEnterViewport from "../../../shared/hooks/useEnterViewPort";
import { GalleryItem } from "../../../shared/util/formatting";
import EnterViewportAnimation from "../../UI/EnterAnimation";
import Footer from "../../UI/Footer";
import Header from "../../UI/Header";
import LoadingFullPage from "../../UI/LoadingFullPage";
import HomeBody from "../../contents/Home/HomeBody";
import HomeTop from "./HomeTop";
import MapGallery from "./MapGallery";

interface HomeMainProps {
  featureImgList: GalleryItem[];
  mapImgList: GalleryItem[];
}

const HomeMain = (props: HomeMainProps) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const isMapEnterViewPort = useEnterViewport(mapRef);
  const [shouldRenderMap, setshouldRenderMap] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // set scroll event
    window.onscroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };
  }, []);

  useEffect(() => {
    // MapGallery can cause init animation lagging, so delay render
    // or render when user scroll to it
    if (isReady) {
      setTimeout(() => setshouldRenderMap(true), 1200);
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isReady]);

  useEffect(() => {
    if (isMapEnterViewPort) {
      setshouldRenderMap(true);
    }
  }, [isMapEnterViewPort]);

  return (
    <>
      {!isReady && <LoadingFullPage />}
      <div className={`${isReady && "fadeIn"}`}>
        <Header isAtPageTop={isAtTop} />
        <HomeTop
          featureImgList={props.featureImgList}
          setIsReady={() => setIsReady(true)}
        />
        <EnterViewportAnimation>
          <HomeBody />
        </EnterViewportAnimation>

        <section ref={mapRef}>
          {shouldRenderMap && <MapGallery imageList={props.mapImgList} />}
        </section>
        <Footer />
      </div>
    </>
  );
};

export default HomeMain;

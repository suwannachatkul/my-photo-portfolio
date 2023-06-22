import { useEffect, useState, useRef } from "react";

import { GalleryItem } from "../../../shared/util/formatting";
import useEnterViewport from "../../../shared/hooks/useEnterViewPort";
import EnterViewportAnimation from "../../UI/EnterAnimation";
import Footer from "../../UI/Footer";
import Header from "../../UI/Header";
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

  useEffect(() => {
    // set scroll event
    window.onscroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    // MapGallery can cause init animation lagging, so delay render
    // or render when user scroll to it
    setTimeout(() => setshouldRenderMap(true), 1200);
  }, []);

  useEffect(() => {
    if (isMapEnterViewPort) {
      setshouldRenderMap(true);
    }
  }, [isMapEnterViewPort]);

  return (
    <>
      <Header isAtPageTop={isAtTop} />
      <HomeTop featureImgList={props.featureImgList} />
      <EnterViewportAnimation>
        <HomeBody />
      </EnterViewportAnimation>

      <section ref={mapRef}>
        {shouldRenderMap && <MapGallery imageList={props.mapImgList} />}
      </section>
      <Footer />
    </>
  );
};

export default HomeMain;

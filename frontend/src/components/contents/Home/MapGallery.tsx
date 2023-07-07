import { useRef, useState, lazy, Suspense } from "react";

import { GalleryItem } from "../../../shared/util/formatting";
import EnterViewportAnimation from "../../UI/EnterAnimation";
import { LightboxGalleryItem } from "../../UI/Lightbox";
import { IsotopRefFunction } from "./IsotopeItems";
import Map from "./Maps";

const IsotopeItemsPromise = import("./IsotopeItems");
const LightboxComponentPromise = import("../../UI/Lightbox");
const IsotopeItems = lazy(() => IsotopeItemsPromise);
const LightboxComponent = lazy(() => LightboxComponentPromise);

const MapGallery = (props: { imageList: GalleryItem[] }) => {
  const isotopeItemRef = useRef<IsotopRefFunction>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isShowLightbox, setIsShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imgAllLoaded, setImgAllLoaded] = useState(false);

  const selectionClickHandle = (name: string) => {
    if (imgAllLoaded) {
      isotopeItemRef.current!.clickItemHandle(name);
    }
  };

  const onImgClick = (imgIndex: number) => {
    setLightboxIndex(imgIndex);
    setIsShowLightbox(true);
  };

  const onLightboxClose = () => {
    setIsShowLightbox(false);
  };

  return (
    <>
      <EnterViewportAnimation>
        <Map
          onRegionClick={selectionClickHandle}
          imgAllLoaded={imgAllLoaded}
        />
      </EnterViewportAnimation>
      <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
        <IsotopeItems
          ref={isotopeItemRef}
          divRef={divRef}
          imageList={props.imageList}
          onImgClick={onImgClick}
          onImgLoaded={() => setImgAllLoaded(true)}
        />
        <LightboxComponent
          imageList={props.imageList as LightboxGalleryItem[]}
          isOpen={isShowLightbox}
          onClose={onLightboxClose}
          currentImageIndex={lightboxIndex}
          setCurrentIndex={setLightboxIndex}
        />
      </Suspense>
    </>
  );
};

export default MapGallery;

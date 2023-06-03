import { useRef, useState, lazy, Suspense } from "react";

import { GalleryItem } from "../../../shared/util/formatting";
import EnterViewportAnimation from "../../UI/EnterAnimation";
import { LightboxGalleryItem } from "../../UI/Lightbox";
import { clickItemHandle } from "./IsotopeItems";
import Map from "./Maps";

const IsotopeItems = lazy(() => import("./IsotopeItems"));
const LightboxComponent = lazy(() => import("../../UI/Lightbox"));

const MapGallery = (props: { imageList: GalleryItem[] }) => {
  const isotopeItemRef = useRef<clickItemHandle>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isShowLightbox, setIsShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const selectionClickHandle = (name: string) => {
    isotopeItemRef.current!.clickItemHandle(name);
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
        <Map onRegionClick={selectionClickHandle} />
      </EnterViewportAnimation>
      <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
        <IsotopeItems
          ref={isotopeItemRef}
          divRef={divRef}
          imageList={props.imageList}
          selectionHandle={selectionClickHandle}
          onImgClick={onImgClick}
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

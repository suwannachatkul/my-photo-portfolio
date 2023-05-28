import { useRef, useState } from "react";

import { GalleryItem } from "../../../util/formatting";
import IsotopeComponent, { filterChangeHandle } from "../../UI/Isotope";
import LightboxComponent, { LightboxGalleryItem } from "../../UI/Lightbox";
import IsotopeItems, { clickItemHandle } from "./IsotopeItems";
import Map from "./Maps";

const MapGallery = (props: { imageList: GalleryItem[] }) => {
  const isoTopeRef = useRef<filterChangeHandle>(null);
  const isotopeItemRef = useRef<clickItemHandle>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isShowLightbox, setIsShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const selectionClickHandle = (name: string) => {
    const { top } = divRef.current!.getBoundingClientRect();
    window.scrollTo({
      top: window.pageYOffset + top - 40,
      behavior: "smooth",
    });

    isoTopeRef.current!.filterChange(name);
    isotopeItemRef.current!.clickItemHandle(name);
  };

  const isotopeContainerClass = "photoList";
  const isotopeItemClass = "single_gallery_item";

  const onImgClick = (imgIndex: number) => {
    setLightboxIndex(imgIndex);
    setIsShowLightbox(true);
  };

  const onLightboxClose = () => {
    setIsShowLightbox(false);
  };

  return (
    <>
      <Map onRegionClick={selectionClickHandle} />
      <IsotopeItems
        ref={isotopeItemRef}
        divRef={divRef}
        imageList={props.imageList}
        isotopeContainerClass={isotopeContainerClass}
        isotopeItemClass={isotopeItemClass}
        selectionHandle={selectionClickHandle}
        onImgClick={onImgClick}
      />
      <IsotopeComponent
        ref={isoTopeRef}
        elementSel={"." + isotopeContainerClass}
        itemSelector={"." + isotopeItemClass}
        percentPosition={true}
        masonry={{
          columnWidth: "." + isotopeItemClass,
        }}
        stagger={30}
        hiddenStyle={{
          opacity: 0,
        }}
        visibleStyle={{
          opacity: 1,
        }}
        transitionDuration="0.5s"
      />
      <LightboxComponent
        imageList={props.imageList as LightboxGalleryItem[]}
        isOpen={isShowLightbox}
        onClose={onLightboxClose}
        currentImageIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </>
  );
};

export default MapGallery;

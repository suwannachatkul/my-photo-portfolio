import IsotopeComponent, { filterChangeHandle } from "../../UI/Isotope";
import IsotopeGallery from "./IsotopeGallery";
import LightboxComponent, { CustomImgListType } from "../../UI/Lightbox";
import { useRef, useState } from "react";


interface IGalleryMain {
    imageList: CustomImgListType[];
}

const GalleryMain = (props: IGalleryMain) => {

    const isoTopeRef = useRef<filterChangeHandle>(null);
    const [isShowLightbox, setIsShowLightbox] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
  
    const selectionClickHandle = (name: string) => {
      isoTopeRef.current!.filterChange(name);
    };
  
    const onImgClick = (imgIndex: number) => {
      setLightboxIndex(imgIndex);
      setIsShowLightbox(true);
    };
  
    const onLightboxClose = () => {
      setIsShowLightbox(false);
    };
  
    const isotopeContainerClass = "photoList";
    const isotopeItemClass = "single_gallery_item";
    return (
        <div className="fadeIn">
                <IsotopeGallery
                  imageList={props.imageList}
                  isotopeContainerClass={isotopeContainerClass}
                  isotopeItemClass={isotopeItemClass}
                  selectionHandle={selectionClickHandle}
                  onImgClick={onImgClick}
                />
                <IsotopeComponent
                  ref={isoTopeRef}
                  elementSel=".photoList"
                  itemSelector=".single_gallery_item"
                  percentPosition={true}
                  masonry={{
                    columnWidth: ".single_gallery_item",
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
                  imageList={props.imageList}
                  isOpen={isShowLightbox}
                  onClose={onLightboxClose}
                  currentImageIndex={lightboxIndex}
                  setCurrentIndex={setLightboxIndex}
                />
              </div>
    )
}

export default GalleryMain
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { stateIsAuth } from "../../../store/authSlice";
// import IsotopeComponent, { filterChangeHandle } from "../../UI/Isotope";
import LightboxComponent, { LightboxGalleryItem } from "../../UI/Lightbox";
import styles from "./GalleryMain.module.css";
import GalleryBody from "./GalleryBody";
import { GalleryItem } from "../../../shared/util/formatting";

interface IGalleryMain {
  imageList: GalleryItem[];
}

const GalleryMain = (props: IGalleryMain) => {
  const isAuth = useSelector(stateIsAuth);
  const [isShowLightbox, setIsShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
    <div className={`fadeIn ${styles.GalleryMain}`}>
      {isAuth && (
        <div className={styles.uploadLinkDiv}>
          <Link to="/gallery/upload" className={`btn ${styles.cta}`}>
            <FontAwesomeIcon
              icon={faSquarePlus}
              size="lg"
              className={`${styles.icon} mx-2`}
            />
            <span>UPLOAD</span>
          </Link>
        </div>
      )}

      <GalleryBody
        imageList={props.imageList}
        isotopeContainerClass={isotopeContainerClass}
        isotopeItemClass={isotopeItemClass}
        onImgClick={onImgClick}
      />
      <LightboxComponent
        imageList={props.imageList as LightboxGalleryItem[]}
        isOpen={isShowLightbox}
        onClose={onLightboxClose}
        currentImageIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
};

export default GalleryMain;

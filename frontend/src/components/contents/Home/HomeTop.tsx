import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GalleryItem } from "../../../shared/util/formatting";
import styles from "./HomeTop.module.css";
import ImageSlider from "./ImageSlider";

interface HomeTopProps {
  featureImgList: GalleryItem[],
  setIsReady: () => void
}

const HomeTop = (props: HomeTopProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  // eslint-disable-next-line
  useEffect(()=>{
    if (imgLoaded) {
      props.setIsReady();
    }
    // eslint-disable-next-line
  },[imgLoaded])

  const startSlide = () => setIsSliding(true);
  const slided = () => setIsSliding(false);

  const shouldAnimate = imgLoaded && !isSliding;
  const aniStyleText = shouldAnimate ? styles.animateText : "";
  const aniStyleBtn = shouldAnimate ? styles.animateBtn : "";

  return (
    <div className={`${imgLoaded && styles.show}`}>
      <div className={styles.TaglineDiv}>
        <h1 className={aniStyleText}>TRAVEL STORIES</h1>
        <div>
          <div className="d-inline-flex">
            <p className={aniStyleText}>My trails through photography.</p>
          </div>
        </div>

        <Link
          to="/gallery"
          className={`${styles.TaglineBtn} ${aniStyleBtn} btn mb-3 mb-sm-0 mr-4 `}
        >
          Gallery
        </Link>
      </div>
      <ImageSlider
        images={props.featureImgList}
        setImgLoaded={() => setImgLoaded(true)}
        startSlideEventHandle={startSlide}
        slidedEventHandle={slided}
      />
    </div>
  );
};

export default HomeTop;

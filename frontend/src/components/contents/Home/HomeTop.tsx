// import { Fragment } from "react";

import ImageSlider from "./ImageSlider";

import styles from "./HomeTop.module.css";
import { useState, useEffect } from "react";

const imageList = [
  {
    src: "/assets/images/DSC07744.png",
    alt: "1",
  },
  {
    src: "/assets/images/DSC04662-3.png",
    alt: "1",
  },
  {
    src: "/assets/images/DSC05072.png",
    alt: "2",
  },
  {
    src: "/assets/images/DSC07366-2.png",
    alt: "3",
  },
];

const HomeTop = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const handleImgLoaded = (isLoaded: boolean) => {
    if (isLoaded) {
      setTimeout(() => {
        setImgLoaded(true);
      }, 100);
    }
  };

  useEffect(() => {
    console.log("ploaded", imgLoaded);
  }, [imgLoaded]);

  const startSlide = () => setIsSliding(true);
  const slided = () => setIsSliding(false);

  const shouldAnimate = imgLoaded && !isSliding;
  const aniStyleText1 = shouldAnimate ? styles.animateText : "";
  const aniStyleText2 = shouldAnimate ? styles.animateText : "";
  const aniStyleBtn = shouldAnimate ? styles.animateBtn : "";

  return (
    <div className={`${styles.main} ${imgLoaded && styles.show} `}>
      <div className={styles.TaglineDiv}>
        <h1 className={aniStyleText1}>TRAVEL STORIES</h1>
        <div>
          <div className="d-inline-flex">
            <p className={aniStyleText2}>My trails through photography.</p>
          </div>
        </div>

        <a
          href="#gallery"
          className={`btn mb-3 mb-sm-0 mr-4 ${styles.TaglineBtn} ${aniStyleBtn}`}
        >
          Gallery
        </a>
      </div>
      <ImageSlider
        images={imageList}
        setImgLoaded={handleImgLoaded}
        startSlideEventHandle={startSlide}
        slidedEventHandle={slided}
      />
    </div>
  );
};

export default HomeTop;

import { useRef, useState } from "react";
import Lightbox, { ImagesListType } from "react-spring-lightbox";

import styles from "./Lightbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import LightboxFooter from "./LightboxFooter";

export type CustomImgListType = ImagesListType[number] & {
  title?: string;
  description?: string;
  tags?: string[];
};

interface ILightBox {
  imageList: CustomImgListType[];
  isOpen: boolean;
  onClose: () => void;
  currentImageIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const LightboxComponent = (props: ILightBox) => {
  const timeoutIdleRef = useRef<ReturnType<typeof setTimeout> | null>();
  const [isIdle, setIsIdle] = useState(false);

  const actionHandle = () => {
    // if currently Idle set to not Idle
    if (isIdle) {
      setIsIdle(false);
    }
    // clear idle timeout
    if (timeoutIdleRef.current) {
      clearTimeout(timeoutIdleRef.current);
    }
    // set timeout for if user idle for 3s then isIdle=true
    timeoutIdleRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 3000);
  };

  const gotoPrevious = () => {
    if (props.currentImageIndex > 0) {
      props.setCurrentIndex(props.currentImageIndex - 1);
    } else {
      props.setCurrentIndex(props.imageList.length - 1);
    }
  };

  const gotoNext = () => {
    if (props.currentImageIndex + 1 < props.imageList.length) {
      props.setCurrentIndex(props.currentImageIndex + 1);
    } else {
      props.setCurrentIndex(0);
    }
  };

  const onCloseHandle = () => {
    // clear timeout
    if (timeoutIdleRef.current) {
      clearTimeout(timeoutIdleRef.current);
    }
    props.onClose();
  };

  const lighboxHeader = (
    <>
      <button className={styles.close} onClick={onCloseHandle}>
        <FontAwesomeIcon icon={faXmark} size="2xl" />
      </button>
    </>
  );

  return (
    <section
      className={styles["overlay"]}
      onMouseMove={actionHandle}
      onClick={actionHandle}
    >
      <Lightbox
        isOpen={props.isOpen}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        onClose={onCloseHandle}
        images={props.imageList}
        className={styles.lightbox}
        currentIndex={props.currentImageIndex}
        singleClickToZoom
        renderPrevButton={() => (
          <button
            className={`${styles["left-arrow"]} ${styles["nav-button"]}`}
            onClick={gotoPrevious}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
        )}
        renderNextButton={() => (
          <button
            className={`${styles["right-arrow"]} ${styles["nav-button"]}`}
            onClick={gotoNext}
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        )}
        renderHeader={() => lighboxHeader}
        renderFooter={() => (
          <LightboxFooter
            key={props.currentImageIndex}
            image={props.imageList[props.currentImageIndex]}
            isIdle={isIdle}
          />
        )}
        pageTransitionConfig={{
            from: { opacity: 0 },
            enter: {opacity: 1 },
            leave: { opacity: 0 },
          }}
      />
    </section>
  );
};

export default LightboxComponent;

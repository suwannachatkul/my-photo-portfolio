import { ReactNode, useRef } from "react";

import styles from "./EnterAnimation.module.css";
import useEnterViewport from "../../shared/hooks/useEnterViewPort";

const EnterViewportAnimation = (props: { children: ReactNode }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const isEnterViewPort = useEnterViewport(elementRef);

  return (
    <div
      ref={elementRef}
      className={`${styles["enter-viewport-animation"]} ${
        isEnterViewPort ? styles.entered : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default EnterViewportAnimation;
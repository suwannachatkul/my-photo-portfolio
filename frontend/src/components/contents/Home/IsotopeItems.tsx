import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Transition } from "react-transition-group";

import { GalleryItem } from "../../../shared/util/formatting";
import IsotopeGallery from "../../UI/IsotopeGallery";
import styles from "./IsotopeItems.module.css";

interface IsotopeItemsProps {
  imageList: GalleryItem[];
  selectionHandle: (name: string) => void;
  divRef: React.RefObject<HTMLDivElement>;
  onImgClick: (imgIndex: number) => void;
}

export interface clickItemHandle {
  clickItemHandle: (name: string) => void;
}

const IsotopeItems = forwardRef((props: IsotopeItemsProps, ref) => {
  const galleryRef = useRef<{ filterChange: (key: string) => void }>(null);
  const [selection, setSelection] = useState("*");
  const [inProp, setInProp] = useState(false);

  // set InProp for fadeIn transition text when selection change
  useEffect(() => {
    setInProp(true);
  }, [selection]);

  function clickItemHandle(name: string) {
    if (selection !== name) {
      setSelection(name);
      setInProp(false);
      galleryRef.current!.filterChange(name);
    }
  }

  useImperativeHandle(ref, () => ({
    clickItemHandle,
  }));

  const transitionStyles: {
    [id: string]: { class: string };
  } = {
    entering: { class: `${styles["my-node-enter"]}` },
    entered: { class: `${styles["my-node-enter-active"]} ${styles["active"]}` },
    exiting: { class: `${styles["my-node-exit"]} ${styles["active"]}` },
    exited: { class: `${styles["my-node-exit-active"]}` },
  };

  return (
    <div ref={props.divRef} className={`${styles["section-padding-80"]} clearfix`}>
      <div className="container-fluid">
        <div className="row col-12 m-auto">
          <div className={styles["filter-selection-menu"]}>
            <div className={styles["portfolio-menu"]}>
              <p className={styles["show-select"]}>
                Region:
                <Transition in={inProp} timeout={300}>
                  {(state) => (
                    <span className={transitionStyles[state].class}>
                      {selection === "*" ? "All" : selection}
                    </span>
                  )}
                </Transition>
              </p>
            </div>
          </div>
        </div>
        <IsotopeGallery
          ref={galleryRef}
          imageList={props.imageList}
          containerName="photoList"
          itemStyle="col-sm-6 col-lg-3 mb-3"
          onImgClick={props.onImgClick}
          onAllImgLoaded={()=>console.log("all Loaded!")}
        />
      </div>
    </div>
  );
});

export default IsotopeItems;

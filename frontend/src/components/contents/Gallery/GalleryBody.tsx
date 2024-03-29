import { useRef, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";

import { GalleryItem } from "../../../shared/util/formatting";
import IsotopeGallery from "../../UI/IsotopeGallery";
import PageHeader from "../../UI/PageHeader";
import styles from "./GalleryBody.module.css";

const SELECTION_LIST = [
  { name: "All", filterName: "*" },
  { name: "Summer", filterName: "Summer" },
  { name: "Spring", filterName: "Spring" },
  { name: "Autumn", filterName: "Autumn" },
  { name: "Winter", filterName: "Winter" },
];

interface GalleryBodyProps {
  imageList: GalleryItem[];
  isotopeContainerClass: string;
  isotopeItemClass: string;
  onImgClick: (imgIndex: number) => void;
}

const GalleryBody = (props: GalleryBodyProps) => {
  const galleryRef = useRef<{ filterChange: (key: string) => void }>(null);
  const [selection, setSelection] = useState("*");
  const [imgAllLoaded, setImgAllLoaded] = useState(false);

  function clickItemHandle(name: string) {
    if (imgAllLoaded) {
      setSelection(name);
      galleryRef.current!.filterChange(name);
    }
  }

  return (
    <div className={`${styles["section-padding"]} clearfix`}>
      <PageHeader parentPath="gallery" />
      <div className="container-fluid">
        <div className="row col-12 m-auto">
          <div className={styles["filter-selection-menu"]}>
            <div className={`${styles["portfolio-menu"]} text-center`}>
              {SELECTION_LIST.map((item) => (
                <button
                  key={item.name}
                  className={`btn ${
                    selection === item.filterName && styles["active"]
                  }`}
                  onClick={() => clickItemHandle(item.filterName)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <IsotopeGallery
          ref={galleryRef}
          imageList={props.imageList}
          containerName="photoList"
          onImgClick={props.onImgClick}
          onAllImgLoaded={() => setImgAllLoaded(true)}
          lazyLoading={false}
        />
      </div>
    </div>
  );
};

export default GalleryBody;

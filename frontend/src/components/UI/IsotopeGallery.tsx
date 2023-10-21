import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./LazyloadAnimate.css"

import Isotope from "isotope-layout";

import { GalleryItem } from "../../shared/util/formatting";
import styles from "./IsotopeGallery.module.css";
import Spinner from "./Spinner";

interface IsotopeGalleryProps extends Isotope.IsotopeOptions {
  imageList: GalleryItem[];
  containerName: string; // ".photoList"
  itemName?: string;
  itemStyle?: string;
  onImgClick?: (imgIndex: number) => void;
  onAllImgLoaded?: () => void;
  lazyLoading?: boolean;
}

const ISOTOPE_GALLERY_DEFAULT = {
  itemName: "sigle-image-item",
  itemStyle: "col-sm-6 col-lg-4 col-xxl-3 mb-3",
  onImgClick: (imgIndex: number) => {},
  onAllImgLoaded: () => {},
  lazyLoading: true,
};

const DEFAULT_ISOTOPE_OPTIONS = {
  itemSelector: "." + ISOTOPE_GALLERY_DEFAULT.itemName,
  percentPosition: true,
  masonry: {
    columnWidth: "." + ISOTOPE_GALLERY_DEFAULT.itemName,
  },
  stagger: 30,
  hiddenStyle: {
    opacity: 0,
  },
  visibleStyle: {
    opacity: 1,
  },
  transitionDuration: "0.5s",
};

const FILTER_INIT_DELAY = 1000;

const isotopeFilterFunc = (tag: string, itemName: HTMLElement) => {
  const dataTags = itemName.getAttribute("data-tag");
  if (dataTags) return dataTags.includes(tag);
  else return false;
};

const IsotopeGallery = forwardRef((props: IsotopeGalleryProps, ref) => {
  // init one ref to store the future isotope object
  const isotope = useRef<Isotope | null>();
  const [filterKey, setFilterKey] = useState<string | null>(null);
  const [imgMounted, setImgMounted] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(0);
  const [imgAllMounted, setImgAllMounted] = useState(false);
  const [imgAllLoaded, setImgAllLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const {
    imageList,
    containerName,
    itemStyle,
    onImgClick,
    onAllImgLoaded,
    lazyLoading,
    ...IsotopeOptions
  } = {
    ...ISOTOPE_GALLERY_DEFAULT,
    ...props,
  };

  const IsotopeOptionsJson = JSON.stringify(IsotopeOptions);

  // initialize an Isotope object with configs
  // when image is mounted
  const dependencies = lazyLoading ? [imgLoaded] : [imgAllMounted, imgAllLoaded]
  const isotopeCreateFlag = lazyLoading ? true : imgAllMounted && imgAllLoaded;
  useEffect(() => {
    if (isotopeCreateFlag && !isotope.current) {
      const optionsFromJson = JSON.parse(IsotopeOptionsJson);
      const IsotopeOpts = {
        ...DEFAULT_ISOTOPE_OPTIONS,
        ...optionsFromJson,
        filter: () => false, // init with filter show none
      };
      isotope.current = new Isotope("." + containerName, IsotopeOpts);
      // delay init filter to make sure image and isotope is created properly
      // and doing animation
      const filter_init_delay = lazyLoading ? 1 : FILTER_INIT_DELAY;
      new Promise<void>((resolve) =>
        setTimeout(() => {
          setFilterKey(null);
          resolve();
        }, filter_init_delay)
      ).then(() => {
        setShowSpinner(false);
        setFilterKey("*");
      });
    } else {
      // reloadItems every changed
      isotope.current?.reloadItems();
    }


    // clear isotope when re-init
    return () => isotope.current?.layout();
    // eslint-disable-next-line
  }, [...dependencies, lazyLoading, isotopeCreateFlag, containerName, IsotopeOptionsJson]);

  // handling filter key change
  useEffect(() => {
    if (filterKey === "*") isotope.current?.arrange({ filter: `*` });
    else if (filterKey === "" || filterKey === null)
      isotope.current?.arrange({ filter: () => false });
    else
      isotope.current?.arrange({
        filter: isotopeFilterFunc.bind(null, filterKey),
      });
  }, [filterKey]);

  // forwardRef filterChange function out
  useImperativeHandle(ref, () => {
    return {
      filterChange(key: string) {
        setFilterKey(key);
      },
    };
  });

  useEffect(() => {
    if (imgMounted === imageList.length) {
      setImgAllMounted(true);
    }
  }, [imgMounted, imageList]);

  const onAllImgLoadedPropsCache = useCallback(onAllImgLoaded, [
    onAllImgLoaded,
  ]);
  useEffect(() => {
    if (imgLoaded === imageList.length) {
      onAllImgLoadedPropsCache();
      setImgAllLoaded(true);
    }
  }, [imgLoaded, imageList, onAllImgLoadedPropsCache]);

  const beforeLoad = () => {
    if (lazyLoading) {
      setImgMounted((prevCnt) => prevCnt + 1);
    } else {
      setTimeout(() => {
        setImgMounted(imageList.length);
      }, 1000);
    }
  };

  const afterLoad = () => {
    setImgLoaded((prevCnt) => prevCnt + 1);
  };

  const itemName = ISOTOPE_GALLERY_DEFAULT.itemName;
  const itemStyles = props.itemStyle
    ? props.itemStyle
    : ISOTOPE_GALLERY_DEFAULT.itemStyle;

  const containerStyles = `${containerName} ${styles["img-container"]} ${
    !lazyLoading && showSpinner ? styles["loading-container"] : ""
  }`;

  const spinnerLoading = (
    <div style={{ position: "relative" }}>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          minHeight: "70vh",
          zIndex: "10",
          opacity: "1",
          transition: "all 1s ease-in-out",
          visibility: "visible",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Spinner type="square" />
      </div>
    </div>
  );
  return (
    <div className={`row mx-lg-5 mx-md-1 ${containerStyles}`}>
      {!lazyLoading && showSpinner && spinnerLoading}
      {props.imageList.map((imgItem, index) => {
        let classTag = "";
        imgItem.tags?.forEach((tag) => {
          classTag += " " + tag;
        });
        return (
          <div
            className={`${itemStyles} ${itemName}`}
            key={index}
            data-tag={`${classTag}`}
          >
            <div className={styles["single-portfolio-content"]}>
              <LazyLoadImage
                key={index}
                src={imgItem.src}
                alt={imgItem.alt}
                effect="blur"
                afterLoad={afterLoad}
                beforeLoad={beforeLoad}
                visibleByDefault={!lazyLoading}
              />
              <div className={styles["hover-content"]}>
                <button onClick={() => onImgClick(index)}>+</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default IsotopeGallery;

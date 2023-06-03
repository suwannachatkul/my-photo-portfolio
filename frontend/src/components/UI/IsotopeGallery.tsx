import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Isotope from "isotope-layout";

import { GalleryItem } from "../../shared/util/formatting";
import styles from "./IsotopeGallery.module.css";

interface IsotopeGalleryProps extends Isotope.IsotopeOptions {
  imageList: GalleryItem[];
  containerName: string; // ".photoList"
  itemName?: string;
  itemStyle?: string;
  onImgClick?: (imgIndex: number) => void;
  onAllImgLoaded?: () => void;
}

const ISOTOPE_GALLERY_DEFAULT = {
  itemName: "sigle-image-item",
  itemStyle: "col-sm-6 col-lg-4 mb-3",
  onImgClick: (imgIndex: number) => {},
  onAllImgLoaded: () => {},
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

const FILTER_INIT_DELAY = 500;

const isotopeFilterFunc = (tag: string, itemName: HTMLElement) => {
  console.log(itemName.getAttribute("data-tag"), tag);
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

  const {
    imageList,
    containerName,
    itemStyle,
    onImgClick,
    onAllImgLoaded,
    ...IsotopeOptions
  } = {
    ...ISOTOPE_GALLERY_DEFAULT,
    ...props,
  };

  const IsotopeOptionsJson = JSON.stringify(IsotopeOptions);

  // initialize an Isotope object with configs
  // when image is mounted
  useEffect(() => {
    if (imgAllMounted && !isotope.current) {
      console.log("Iso loadend");
      const optionsFromJson = JSON.parse(IsotopeOptionsJson);
      const IsotopeOpts = {
        ...DEFAULT_ISOTOPE_OPTIONS,
        ...optionsFromJson,
      };
      isotope.current = new Isotope("." + containerName, IsotopeOpts);
      // delay init filter to make sure image and isotope is created properly
      new Promise<void>((resolve) =>
        setTimeout(() => {
          isotope.current?.arrange({ filter: () => false });
          resolve();
        }, FILTER_INIT_DELAY)
      ).then(()=>{
        setFilterKey("*");
      });
    }

    // clear isotope when re-init
    return () => isotope.current?.destroy();
  }, [imgAllMounted, containerName, IsotopeOptionsJson]);

  // handling filter key change
  useEffect(() => {
    console.log("fil changed", filterKey);
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

  const onAllImgLoadedCache = useCallback(onAllImgLoaded, [onAllImgLoaded]);
  useEffect(() => {
    if (imgLoaded === imageList.length) {
      onAllImgLoadedCache();
    }
  }, [imgLoaded, imageList, onAllImgLoadedCache]);

  const beforeLoad = () => {
    setImgMounted((prevCnt) => prevCnt + 1);
  };

  const afterLoad = () => {
    setImgLoaded((prevCnt) => prevCnt + 1);
  };

  const itemName = ISOTOPE_GALLERY_DEFAULT.itemName;
  const itemStyles = props.itemStyle
    ? props.itemStyle
    : ISOTOPE_GALLERY_DEFAULT.itemStyle;

  return (
    <div
      className={`row mx-lg-5 mx-md-1 ${containerName} ${styles.imgContainer}`}
    >
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

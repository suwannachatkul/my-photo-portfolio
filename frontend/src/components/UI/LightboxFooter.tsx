import { useEffect, useState } from "react";
import { LightboxGalleryItem } from "./Lightbox";
import styles from "./Lightbox.module.css";

interface ILightboxFooter {
  image: LightboxGalleryItem;
  isIdle: boolean;
}

const LightboxFooter = (props: ILightboxFooter) => {
  const [shouldHide, setShouldHide] = useState(true);

  useEffect(() => {
    // Initially hide for 750ms
    const timer = setTimeout(() => {
      setShouldHide(false);
    }, 750);

    // Clear the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <footer
        className={`row gx-0 px-4 py-2 py-xl-4 ${styles.footer} ${
          shouldHide || props.isIdle ? styles.hide : ''
        }`}
      >
        <h2 className="mx-4 my-2 my-xl-4">{props.image.title}</h2>
        <p className="mx-4" style={{ boxSizing: "border-box" }}>
          {props.image.description}
        </p>
        <div className="mx-4 my-2 pb-2 my-xxl-3 pb-xxl-3">
          {props.image.tags?.map((tag) => (
            <span key={tag} className="badge rounded-pill bg-secondary m-1">
              {tag}
            </span>
          ))}
        </div>
      </footer>
    </>
  );
};

export default LightboxFooter;

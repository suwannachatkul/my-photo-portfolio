import { CustomImgListType } from "./Lightbox";
import styles from "./Lightbox.module.css";

interface ILightboxFooter {
  image: CustomImgListType;
  isIdle: boolean;
}

const LightboxFooter = (props: ILightboxFooter) => {
  return (
    <>
      <footer
        className={`row gx-0 p-4 ${styles.footer} ${
          props.isIdle && styles.hide
        }`}
      >
        <h2 className="m-4">{props.image.title}</h2>
        <p className="mx-4" style={{ boxSizing: "border-box" }}>
          {props.image.description}
        </p>
        <div className="m-4 pb-4">
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

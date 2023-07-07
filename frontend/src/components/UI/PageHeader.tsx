import { useLocation } from "react-router-dom";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./PageHeader.module.css";

const PageHeader = (props: { parentPath: string }) => {
  const location = useLocation();
  const childPath = location.pathname
    .split("/")
    .filter((path) => path.length > 0 && path !== props.parentPath)
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1));

  const headerText = [
    props.parentPath.charAt(0).toUpperCase(),
    props.parentPath.slice(1),
  ];
  return (
    <div className={`${styles["headerDiv"]} my-5`}>
      <h1>
        <span className={styles["color-add"]}>{headerText[0]}</span>
        {headerText[1]}
        <span className={styles["color-add"]}>.</span>
      </h1>
      {childPath.map((path) => (
        <h3 key={path}>
          <FontAwesomeIcon icon={faAngleRight} size="xs" className="mx-1" />
          <span className={styles["color-add"]}></span>
          {path}
          <span className={styles["color-add"]}>.</span>
        </h3>
      ))}
    </div>
  );
};

export default PageHeader;

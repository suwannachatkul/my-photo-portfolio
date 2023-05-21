import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../components/UI/Header";

const ErrorPage: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        <FontAwesomeIcon
          icon={faScrewdriverWrench}
          size="5x"
          style={{ marginBottom: "20px", marginTop: "12rem" }}
        />
        <h1 style={{ fontSize: "50px", fontWeight: "500" }}>
          Page <span style={{ color: "#fc6060" }}>Not</span> Found!
        </h1>
      </div>
    </>
  );
};

export default ErrorPage;

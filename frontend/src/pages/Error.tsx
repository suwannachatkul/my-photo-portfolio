import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../components/UI/Header";

interface ErrorPageProps {
  errType?: "NotFound" | "ComingSoon" | "Error"; // Make the prop optional with "?"
};

const ErrorPage = ({ errType = "Error" }: ErrorPageProps) => {
  let errTextElem;
  switch (errType) {
    case "NotFound":
      errTextElem = (
        <h1 style={{ fontSize: "50px", fontWeight: "500", lineHeight: "5rem"}}>
          Page <span style={{ color: "#fc6060" }}>Not</span> Found!
          <br />
          &#128575;
        </h1>
      );
      break;
    case "ComingSoon":
      errTextElem = (
        <h1 style={{ fontSize: "50px", fontWeight: "500", lineHeight: "5rem" }}>
          Coming <span style={{ color: "#fc6060" }}>Soon</span>!
          <br />
          &#128054;
        </h1>
      );
      break;
    default:
      errTextElem = (
        <h1 style={{ fontSize: "50px", fontWeight: "500", lineHeight: "5rem" }}>
          Something went <span style={{ color: "#fc6060" }}>wrong</span>
          <br />
          <h2>Please <span style={{ color: "#fc6060" }}>try again</span> later!</h2>
          &#129402;
        </h1>
      );
  }
  return (
    <>
      <Header />
      <div style={{ textAlign: "center" }}>
        <FontAwesomeIcon
          icon={faScrewdriverWrench}
          size="5x"
          style={{ marginBottom: "20px", marginTop: "12rem" }}
        />
        {errTextElem}
      </div>
    </>
  );
};

export default ErrorPage;

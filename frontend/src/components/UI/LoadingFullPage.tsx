import Spinner from "./Spinner";

const LoadingFullPage = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        zIndex: "1",
        opacity: "1",
        transition: "all 1s ease-in-out",
        visibility: "visible",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Spinner />
    </div>
  );
};
export default LoadingFullPage;

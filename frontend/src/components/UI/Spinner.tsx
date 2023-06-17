import styles from "./Spinner.module.css";


interface SpinnerProps {
  type?: "ellipsis" | "square" | "circle";
}

const Spinner = ({ type = "ellipsis" }: SpinnerProps) => {
  if (type === "ellipsis") {
    return (
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else {
    let spinnerClass = type === "square" ? styles["loader-square"] : styles["loader-circle"];
    return <span className={spinnerClass}></span>;
  }
};

export default Spinner;

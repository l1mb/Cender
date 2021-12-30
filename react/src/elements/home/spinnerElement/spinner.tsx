import styles from "./spinner.module.scss";

function Spinner(): JSX.Element {
  return <div className={styles.loader}>Loading...</div>;
}

export default Spinner;

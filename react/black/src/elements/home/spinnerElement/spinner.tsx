import styles from "./spinner.module.scss";

function Spinner(): JSX.Element {
  return (
    <div className={styles.cubeGrid}>
      <div className={`${styles.cube} ${styles.cube1}`} />
      <div className={`${styles.cube} ${styles.cube2}`} />
      <div className={`${styles.cube} ${styles.cube3}`} />
      <div className={`${styles.cube} ${styles.cube4}`} />
      <div className={`${styles.cube} ${styles.cube5}`} />
      <div className={`${styles.cube} ${styles.cube6}`} />
      <div className={`${styles.cube} ${styles.cube7}`} />
      <div className={`${styles.cube} ${styles.cube8}`} />
      <div className={`${styles.cube} ${styles.cube9}`} />
    </div>
  );
}

export default Spinner;

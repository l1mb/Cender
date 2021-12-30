import styles from "./background.module.scss";

const Background: React.FC = (props) => <div className={styles.portalWrapper}>{props.children}</div>;

export default Background;

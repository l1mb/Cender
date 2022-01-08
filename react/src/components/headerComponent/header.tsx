/* eslint-disable react/function-component-definition */
import HeaderProps from "@/types/interfaces/props/headerProps/headerProps";
import styles from "./header.module.scss";
import Navigation from "./navComponent/nav";

const Header: React.FC<HeaderProps> = (props): JSX.Element => (
  <header className={styles.header}>
    <div className={styles.blocks}>
      <span className={styles.label}>Cender</span>
    </div>
    <div className={styles.blocks}>
      <Navigation data={props.data} signOutHandle={props.signOutHandle} />
    </div>
  </header>
);

export default Header;

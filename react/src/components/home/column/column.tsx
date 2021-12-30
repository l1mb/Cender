import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

interface ColumnProps {
  label: string;
  route: string;
  logo: string;
}

function Column(props: ColumnProps) {
  return (
    <div className={styles.column}>
      <img src={props.logo} alt="Yan" />
      <NavLink to={props.route}>{props.label}</NavLink>
    </div>
  );
}

export default Column;

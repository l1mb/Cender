import { NavLink } from "react-router-dom";
import LabelledLink from "@/components/routesComponent/types/routes/labelledLink";
import styles from "./dropdown.module.scss";

interface DropMenuProps {
  data: LabelledLink[];
  className: string;
}

function DropMenu(props: DropMenuProps): JSX.Element {
  const options = props.data;

  return (
    <div className={`${styles.drowdown_wrapper} ${props.className}`}>
      {options.map((item) => (
        <li key={item.label} className={styles.option}>
          <NavLink activeClassName={styles.active} to={item.route}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </div>
  );
}

export default DropMenu;

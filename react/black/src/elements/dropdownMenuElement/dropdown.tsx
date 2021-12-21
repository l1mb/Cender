import LabelledLink from "@/components/routesComponent/types/routes/labelledLink";
import StyledProps from "@/types/interfaces/props/styledProps";
import { NavLink } from "react-router-dom";
import styles from "./dropdown.module.scss";

const DropMenu: React.FC<{ props: StyledProps<LabelledLink[]> }> = ({ props }) => {
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
};

export default DropMenu;

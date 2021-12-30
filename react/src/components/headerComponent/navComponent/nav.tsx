/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DropMenu from "@/elements/dropdownMenuElement/dropdown";
import HeaderCartItem from "@/elements/cart/headerCartElement/header";
import StateType from "@/redux/types/stateType";
import styles from "./nav.module.scss";
import { IRoutes } from "@/components/routesComponent/types/routes/IRoutes";

interface HeaderProps {
  data: IRoutes;
  signOutHandle: () => void;
}

function Navigation(props: HeaderProps): JSX.Element {
  const appState = useSelector<StateType, StateType>((state) => state);

  return (
    <nav className={styles.navBar}>
      <ol>
        <li>
          <NavLink activeClassName={styles.active} to={props.data.home.route}>
            {props.data.home.label}
          </NavLink>
        </li>

        <div tabIndex={0} className={styles.dropdown_link_wrapper}>
          <span>Products</span>
          <DropMenu data={props.data.products} className={styles.dropdown_wrapper} />
        </div>
        {!appState.user.authenticated && (
          <li>
            <NavLink activeClassName={styles.active} to={props.data.signIn.route}>
              {props.data.signIn.label}
            </NavLink>
          </li>
        )}

        {!appState.user.authenticated ? (
          <li>
            <NavLink activeClassName={styles.active} to={props.data.signUp.route}>
              {props.data.signUp.label}
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <HeaderCartItem styles={styles} data={props} />
            </li>
            <li>
              <button type="button" onClick={props.signOutHandle}>
                <span>Sign out</span>
              </button>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
export default Navigation;

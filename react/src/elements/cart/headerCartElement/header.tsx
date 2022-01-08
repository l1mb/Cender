import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import StateType from "@/redux/types/stateType";
import cartIcon from "../../../assets/icons/shopping-cart.png";
import stl from "./header.module.scss";
import PreOrderState from "@/redux/types/orders";

function HeaderCartItem(props): JSX.Element {
  const ordersCount = useSelector<StateType, PreOrderState>((state) => state.orders);

  return (
    <NavLink activeClassName={props.styles.active} to={props.data.data.cart.route}>
      {props.data.data.cart.label}
      <img src={cartIcon} alt="cart" className={stl.img} />
      <div className={stl.imageContainer}>
        <div className={stl.avatarCircle}>
          <p className={stl.initials}>{ordersCount.items.length}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default HeaderCartItem;

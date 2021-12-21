import StateType from "@/redux/types/stateType";
import HeaderProps from "@/types/interfaces/props/headerProps/headerProps";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import cartIcon from "../../../assets/icons/shopping-cart.png";
import stl from "./header.module.scss";

const HeaderCartItem: React.FC<{
  styles: {
    [className: string]: string;
  };
  data: HeaderProps;
}> = (props): JSX.Element => {
  const ordersCount = useSelector<StateType, { count: number }>((state) => state.orders);

  return (
    <NavLink activeClassName={props.styles.active} to={props.data.data.cart.route}>
      {props.data.data.cart.label}
      <img src={cartIcon} alt="cart" className={stl.img} />
      <div className={stl.imageContainer}>
        <div className={stl.avatarCircle}>
          <p className={stl.initials}>{ordersCount.count}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default HeaderCartItem;

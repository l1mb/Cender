import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory, withRouter } from "react-router-dom";
import userDto from "@/api/types/user/userDto";
import actions from "@/redux/actions/actions";
import setCountDispatch from "@/redux/actions/orders/setCount";
import signInDispatch from "@/redux/actions/signIn";
import StateType from "@/redux/types/stateType";
import roles from "@/types/constants/roles/roles";
import defaultUser from "@/types/constants/user/defaultUser";
import PrivateRoute from "./protectedRouteComponent/protectedRoute";
import RoutesData from "./types/routes/RoutesData";
import Home from "../home/home";
import About from "../about/about";
import Products from "../products/products";
import getRole from "@/helpers/role/getRole";

const SignIn = React.lazy(() => import("../authComponents/signIn"));
const SignUp = React.lazy(() => import("../authComponents/signUp"));
const Cart = React.lazy(() => import("../cartComponent/cart"));
const Header = React.lazy(() => import("../headerComponent/header"));

function Wrapper() {
  const appUser = useSelector<StateType, userDto>((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const signedOut = () => {
    dispatch(actions.setUser(defaultUser));
    dispatch(actions.setRole(roles.stranger));
    localStorage.clear();
    history.push(RoutesData.home.route);
  };

  useEffect(() => {
    dispatch(setCountDispatch());
    dispatch(signInDispatch());
    dispatch(actions.setRole(getRole()));
  }, []);

  return (
    <>
      <Header data={RoutesData} signOutHandle={signedOut} />

      <Switch>
        <Route exact path={RoutesData.home.route}>
          <Home />
        </Route>

        <Route exact path={RoutesData.signUp.route}>
          <SignUp successRoute={RoutesData.home.route} redirectRoute={RoutesData.home.route} />
        </Route>
        <Route exact path={RoutesData.signIn.route}>
          <SignIn successRoute={RoutesData.home.route} redirectRoute={RoutesData.home.route} />
        </Route>
        <Route exact path={RoutesData.about.route}>
          <About />
        </Route>
        <Route exact path={RoutesData.computers.route}>
          <Products />
        </Route>
        <PrivateRoute user={appUser} path={RoutesData.cart.route}>
          <Cart />
        </PrivateRoute>

        <Route render={() => <Redirect to={RoutesData.home.route} />} />
      </Switch>
    </>
  );
}

const WrappedContent = withRouter(Wrapper);

export default WrappedContent;

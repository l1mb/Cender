import userDto from "@/api/types/user/userDto";
import { Redirect, Route } from "react-router-dom";
import RoutesData from "../types/routes/RoutesData";

interface Props {
  user: userDto | null;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({ children, user }): JSX.Element => (
  <Route
    exact
    render={({ location }) =>
      user?.authencated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: RoutesData.signIn.route,
            state: { from: location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

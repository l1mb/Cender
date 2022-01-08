import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import getToken from "../token/getToken";

const getRole = (): string => {
  const token = getToken();
  let role = "";
  try {
    if (token) {
      role =
        jwtDecode<{ "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string }>(token)[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
    }
  } catch (e) {
    toast.error(`${e}`);
  }

  return role;
};

export default getRole;

import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import getToken from "./getToken";

const getUsername = (): string => {
  const token = getToken();
  let role = "";
  try {
    if (token) {
      const decoded = jwtDecode(token);
      role += decoded.username;
    }
  } catch (e) {
    toast.error(`${e}`);
  }
  return role;
};

export default getUsername;

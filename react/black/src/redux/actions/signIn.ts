import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "@/api/httpService/authService";
import signInUserDto from "@/api/types/user/signInUserDto";
import userDto from "@/api/types/user/userDto";
import toastProps from "@/types/constants/toasts/toastProps";
import actions from "./actions";
import userService from "@/api/httpService/user/userService";
import getRole from "@/helpers/role/getRole";
import getToken from "@/helpers/token/getToken";

const signInDispatch =
  (user?: signInUserDto) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: userDto | null | string;
    }>
  ): Promise<void> => {
    if (user) {
      const response = await authService.signIn(user);

      if (response.status === 200) {
        const JWT = (await response.json()).token;
        localStorage.setItem("token", JWT);
      } else {
        toast.error("We have troubles with getting you in, try later", toastProps);
      }
    }

    if (getToken()) {
      const userInfoPromise = await userService.getInfo();
      const updatedUser: { user: userDto; token: string } = await userInfoPromise.json();
      updatedUser.user.authencated = true;
      dispatch(actions.setRole(getRole()));
      dispatch(actions.setUser(updatedUser.user));
    }
  };

export default signInDispatch;

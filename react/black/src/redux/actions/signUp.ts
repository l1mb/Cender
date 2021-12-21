import authService from "@/api/httpService/authService";
import userService from "@/api/httpService/user/userService";
import signUpUserDto from "@/api/types/user/signUpUserDto";
import userDto from "@/api/types/user/userDto";
import getRole from "@/helpers/role/getRole";
import errors from "@/types/constants/errors/errors";
import toastProps from "@/types/constants/toasts/toastProps";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import actions from "./actions";

const signUpDispatch =
  (user: signUpUserDto, setResult: (value: number) => void) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: userDto | string | null;
    }>
  ): Promise<void> => {
    const response = await authService.signUp(user);
    const castedUserPromise = await userService.getInfo();
    const castedUser = await castedUserPromise.json();
    castedUser.authenticated = true;
    if (response.status === 201) {
      dispatch(actions.setUser(castedUser));
      toast.success(errors.emailConfirm, toastProps);
      dispatch(actions.setRole(getRole()));
    } else {
      toast.error(errors.loginFailure, toastProps);
    }
    setResult(response.status);
  };
export default signUpDispatch;

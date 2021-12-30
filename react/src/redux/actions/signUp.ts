import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "@/api/httpService/authService";
import signUpUserDto from "@/api/types/user/signUpUserDto";
import userDto from "@/api/types/user/userDto";
import errors from "@/types/constants/errors/errors";
import toastProps from "@/types/constants/toasts/toastProps";

const signUpDispatch =
  (user: signUpUserDto, setResult: (value: number) => void) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: userDto | string | null;
    }>
  ): Promise<void> => {
    console.log("suka");
    const response = await authService.signUp(user);
    if (response.status === 200) {
      toast.success(errors.emailConfirm, toastProps);
    } else {
      toast.error(errors.loginFailure, toastProps);
    }
    setResult(response.status);
  };
export default signUpDispatch;

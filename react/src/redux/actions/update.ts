import toastProps from "@/types/constants/toasts/toastProps";
import { toast } from "react-toastify";
import userService from "@/api/httpService/user/userService";
import userDto from "@/api/types/user/userDto";
import { Dispatch } from "react";
import actions from "./actions";

const updateUserDispatch =
  (user: userDto) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: userDto | null;
    }>
  ): Promise<void> => {
    const responseStatus = await userService.update(user);
    if (responseStatus.status === 204) {
      dispatch(actions.setUser(user));
      toast.success("Updated successfully", toastProps);
    } else {
      toast.error("We have troubles with updating your profile", toastProps);
    }
  };

export default updateUserDispatch;

import { Dispatch } from "@reduxjs/toolkit";
import newsApi from "@/api/httpService/news/newsApi";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import actions from "../actions";

const setNewsDispatch =
  () =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: mnfrReadDto[];
    }>
  ): Promise<void> => {
    const mnfrs: mnfrReadDto[] = await newsApi.getMnfrs();
    dispatch(actions.setMnfrs(mnfrs));
  };
export default setNewsDispatch;

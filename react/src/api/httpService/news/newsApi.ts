import endpoints from "@/api/endpoints";
import getOptions from "../tokenedOptions";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import updateNews from "@/types/interfaces/news/updateNews";
import postNews from "@/types/interfaces/news/postNews";

const getMnfrs = async (): Promise<mnfrReadDto[]> => {
  const data = await fetch(`${endpoints.mnfrs}`, getOptions("GET", false));

  return data.json();
};

const postNews = async (prop: postNews): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("POST", true, prop));

  return data;
};

const deleteNews = async (prop: { keys: number }): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("DELETE", true, prop));

  return data;
};

const putNews = async (body: updateNews): Promise<Response> => {
  const data = await fetch(`${endpoints.news}`, getOptions("PUT", true, body));
  return data;
};

export default { getMnfrs, putNews, deleteNews, postNews };

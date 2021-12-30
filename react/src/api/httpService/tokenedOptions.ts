import getToken from "@/helpers/token/getToken";

interface headerOptions {
  method: string;
  headers: {
    "Content-Type": "application/json";
    Accept: "application/json";
    Authorization?: string;
  };
  body?: string;
}

const getOptions = <T>(methodType: string, useToken: boolean, body?: T): headerOptions => {
  console.log(body);
  return {
    method: methodType,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: useToken ? `Bearer ${getToken()}` : undefined,
    },
    body: body ? JSON.stringify(body) : undefined,
  };
};

export default getOptions;

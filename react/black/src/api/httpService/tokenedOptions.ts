interface headerOptions {
  method: string;
  headers: {
    "Content-Type": "application/json";
    Accept: "application/json";
    Authorization?: string;
  };
  body?: string;
}

const getOptions = <T>(methodType: string, useToken: boolean, body?: T): headerOptions => ({
  method: methodType,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: useToken ? `Bearer ${JSON.parse(localStorage.getItem("token") as string)}` : undefined,
  },
  body: body ? JSON.stringify(body) : undefined,
});

export default getOptions;

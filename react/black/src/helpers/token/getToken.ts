const getToken = (): string => {
  const token = localStorage.getItem("token") as string;
  return JSON.parse(token);
};

export default getToken;

const getToken = (): string => {
  const token = localStorage.getItem("token") as string;
  return token;
};

export default getToken;

import endpoints from "@/api/endpoints";
import getToken from "@/helpers/token/getToken";
import getOptions from "../tokenedOptions";

const deleteProduct = async (prop: number): Promise<Response> => {
  const data = await fetch(`${endpoints.getProductsById}/${prop}`, getOptions("DELETE", true));
  return data;
};

const postProduct = async (prop: FormData): Promise<Response> => {
  const token = getToken();
  const data = await fetch(`${endpoints.products}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: prop,
  });

  return data;
};

const putProduct = async (prop: FormData): Promise<Response> => {
  const token = getToken();
  const data = await fetch(`${endpoints.products}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: prop,
  });
  return data;
};

export default { deleteProduct, postProduct, putProduct };

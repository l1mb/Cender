import endpoints from "@/api/endpoints";
import { updateProductDto } from "@/api/types/newProduct/cuProductDto";
import getToken from "@/helpers/token/getToken";
import getOptions from "../tokenedOptions";

const deleteProduct = async (prop: number): Promise<Response> => {
  const data = await fetch(`${endpoints.getProductsById}/${prop}`, getOptions("DELETE", true));
  return data;
};

const postProduct = async (prop: updateProductDto): Promise<Response> => {
  const token = getToken();
  const data = await fetch(`${endpoints.products}`, getOptions("POST", true, prop));

  return data;
};

const putProduct = async (prop: updateProductDto): Promise<Response> => {
  const token = getToken();
  const data = await fetch(`${endpoints.products}`, getOptions("PUT", true, prop));
  return data;
};

const apiGetVendors = async (): Promise<{ id: number; vendorName: string }[] | null> => {
  const tdata = await fetch(`${endpoints.mnfrs}`, getOptions("GET", true));

  if (tdata.status === 200) {
    return tdata.json();
  }
  return null;
};
const apiGetPickUps = async (): Promise<{ id: number; name: string }[] | null> => {
  const tdata = await fetch(`${endpoints.pickups}`, getOptions("GET", true));

  if (tdata.status === 200) {
    return tdata.json();
  }
  return null;
};

const apiGetCount = async (): Promise<{ count: number } | null> => {
  const tdata = await fetch(`${endpoints.pages}`, getOptions("GET", true));

  if (tdata.status === 200) {
    return tdata.json();
  }
  return null;
};

export default { deleteProduct, postProduct, putProduct, apiGetVendors, apiGetPickUps, apiGetCount };

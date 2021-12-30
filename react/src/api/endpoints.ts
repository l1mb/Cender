const host = "/api";
const getProductSearchEndpoint = `${host}/products/search`;
const getProductListEndpoint = `${host}/products`;
const getProductByPlatform = `${host}/products/byPlatform`;
const getProductsById = `${host}/products`;
const products = `${host}/products`;

const postSignUp = `${host}/register`;
const postSignIn = `${host}/auth`;
const user = `${host}/get-user`;
const userPassword = `${host}/${user}/password`;
const orders = `${host}/orders`;
const completeOrders = `${orders}/complete`;
const pages = `${products}/pages`;
const mnfrs = `${host}/get-vendors`;
const pickups = `${host}/pickups`;
const news = `${mnfrs}/news`;

export default {
  getProductSearchEndpoint,
  getProductListEndpoint,
  products,
  postSignUp,
  postSignIn,
  user,
  userPassword,
  orders,
  getProductByPlatform,
  getProductsById,
  pickups,
  completeOrders,
  pages,
  news,
  mnfrs,
};

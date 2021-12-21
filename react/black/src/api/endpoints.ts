const host = "http://localhost:5000/api";
const getProductSearchEndpoint = `${host}/products/search`;
const getProductListEndpoint = `${host}/products/list`;
const getProductByPlatform = `${host}/products/byPlatform`;
const getProductsById = `${host}/products/id`;
const products = `${host}/products/`;

const postSignUp = `${host}/users/sign-up`;
const postSignIn = `${host}/users/login`;
const user = `${host}/user`;
const userPassword = `${host}/${user}/password`;
const orders = `${host}/orders`;
const ordersComplete = `${host}/${orders}/buy`;
const ordersCompleted = `${host}/${orders}/completed`;
export default {
  getProductSearchEndpoint,
  getProductListEndpoint,
  products,
  postSignUp,
  postSignIn,
  user,
  userPassword,
  orders,
  ordersComplete,
  getProductByPlatform,
  getProductsById,
  ordersCompleted,
};

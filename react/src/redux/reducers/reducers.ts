import { combineReducers } from "redux";
import ProductsReducer from "./productReducer";
import orderReducer from "./orderReducer";
import roleReducer from "./roleReducer";

import userReducer from "./userReducer";
import newsReducer from "./newsReducer";

const reducers = combineReducers({
  user: userReducer,
  orders: orderReducer,
  role: roleReducer,
  products: ProductsReducer,
  mnfrs: newsReducer,
});

export default reducers;

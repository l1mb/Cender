import { combineReducers } from "redux";
import ProductsReducer from "./productReducer";
import orderReducer from "./orderReducer";
import roleReducer from "./roleReducer";

import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  orders: orderReducer,
  role: roleReducer,
  Products: ProductsReducer,
});

export default reducers;

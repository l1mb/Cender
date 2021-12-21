import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers/reducers";

export default configureStore({ reducer: reducers });

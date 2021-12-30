import { SET_COUNT } from "../actions/actions";
import OrderState from "../types/orders";

interface orderAction {
  type: string;
  payload: OrderState;
}

const orderReducer = (state: OrderState = { count: 0 }, action: orderAction): OrderState => {
  switch (action.type) {
    case SET_COUNT: {
      if (action.payload) {
        return {
          ...state,
          count: action.payload.count,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default orderReducer;

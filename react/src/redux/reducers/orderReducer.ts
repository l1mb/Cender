import { SET_ORDER } from "../actions/actions";
import OrderState from "../types/orders";

interface orderAction {
  type: string;
  payload: OrderState;
}

const orderReducer = (state: OrderState = { items: [] }, action: orderAction): OrderState => {
  console.log(`reducer: ${JSON.stringify(state)}`);
  switch (action.type) {
    case SET_ORDER: {
      if (action.payload) {
        return {
          ...state,
          items: action.payload.items,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default orderReducer;

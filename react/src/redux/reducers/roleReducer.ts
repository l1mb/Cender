import { SET_ROLE } from "../actions/actions";

interface roleAction {
  type: string;
  payload: string;
}

const roleReducer = (state = "", action: roleAction): string => {
  switch (action.type) {
    case SET_ROLE: {
      const value = action.payload;
      return value;
    }
    default:
      return state;
  }
};

export default roleReducer;

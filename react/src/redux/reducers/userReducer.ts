import userDto from "@/api/types/user/userDto";
import defaultUser from "@/types/constants/user/defaultUser";
import { SET_USER } from "../actions/actions";

interface userAction {
  type: string;
  payload: userDto | null;
}

const userReducer = (state: userDto | null = defaultUser, action: userAction): userDto | null => {
  switch (action.type) {
    case SET_USER: {
      if (action.payload) {
        return {
          ...state,
          id: action.payload.id,
          email: action.payload.email,
          username: action.payload.username,
          authenticated: action.payload.authenticated,
        };
      }
      return null;
    }
    default:
      return state;
  }
};

export default userReducer;

import endpoints from "@/api/endpoints";
import userDto from "@/api/types/user/userDto";
import getOptions from "../tokenedOptions";

interface patchOptions {
  op: string;
  path: string;
  value: string;
}

class UserService {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  getInfo = async () => {
    const tdata = await fetch(endpoints.user, getOptions("GET", true));
    return tdata;
  };

  update = async (user: userDto) => {
    const tdata = await fetch(`/api/user`, getOptions("PUT", true, user));
    return tdata;
  };

  patch = async (password: string) => {
    const patchBody = [
      {
        op: "add",
        path: "/password",
        value: password,
      },
    ];

    const response = await fetch(endpoints.userPassword, getOptions<patchOptions[]>("PATCH", true, patchBody));

    return response;
  };
}

export default new UserService();

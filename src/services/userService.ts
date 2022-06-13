import axios from "axios";
import { requestType } from "../types/requestType";
import { URLPerfix } from "./globalService";

export const UserService = {
  register: async (userName: string, userPassword: string) => {
    const res = await axios.post<requestType<never>>(
      URLPerfix + "/user/register",
      {
        userName,
        userPassword,
      }
    );
    return res.data;
  },

  login: async (userName: string, userPassword: string) => {
    const res = await axios.post<requestType<string>>(
      URLPerfix + "/user/login",
      {
        userName,
        userPassword,
      }
    );
    return res.data;
  },
};

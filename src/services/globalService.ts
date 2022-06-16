import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { requestType } from "../types/requestType";

export const URLPerfix = "http://127.0.0.1:4523/mock/1085790";
export function globalRequest<T extends requestType<any>>(
  config: AxiosRequestConfig<T>
) {
  config = {
    ...config,
    baseURL: URLPerfix,
    headers: { Authorization: localStorage.getItem("auth") || "" },
  };
  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios(config).then((res: AxiosResponse<T>) => {
      if (!res.data.code.toString().startsWith("200")) {
        alert(res.data.msg);
        reject(res.data.msg);
      } else {
        resolve(res);
      }
    });
  });
}

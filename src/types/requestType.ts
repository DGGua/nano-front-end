export type requestType<T> = {
  code: number;
  msg: string;
  data: T;
};

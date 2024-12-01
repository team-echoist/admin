import { UserType } from "./user";

export type ResponseType<T> = {
  data: T;
};

export type ResponseErrorType = {
  status: number;
  message: string;
};

export type ResponsePaginationType = {
  total: number;
  page: number;
  totalPage: number;
};

export type AuthorType = Pick<UserType, "id" | "nickname" | "email">;
export type ProcessorType = { name: string } & Pick<UserType, "id" | "email">;

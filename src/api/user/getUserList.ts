import { ResponsePaginationType, ResponseType } from "..";

import AxiosInstance from "../AxiosInstance";
import { ListParams } from "../../types/params";
import { UserType } from ".";

export type UserListResponseType = {
  users: UserType[];
} & ResponsePaginationType;

export default async function getUserList(params: ListParams) {
  const { page, perPage } = params.pagination;

  const filter = "all";

  const url = `/admin-management/users?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await AxiosInstance.get<ResponseType<UserListResponseType>>(
    url
  );

  return response.data.data;
}

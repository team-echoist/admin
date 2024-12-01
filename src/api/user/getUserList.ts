import { ResponsePaginationType, ResponseType } from "..";

import AxiosInstance from "../AxiosInstance";
import { ListParams } from "../../types/params";
import { UserType } from ".";
import { omit } from "lodash-es";

// TODO: 검색 응답값 통일
export type UserListResponseType = {
  users: UserType[];
  usersDto: UserType[];
} & ResponsePaginationType;

export default async function getUserList(params: ListParams) {
  const { page, perPage } = params.pagination;
  const keyword = params.filter?.keyword || "";
  const filter = "all";

  const url = keyword
    ? `/admin-management/users/search/${keyword}`
    : `/admin-management/users?page=${page}&limit=${perPage}&filter=${filter}`;

  const response = await AxiosInstance.get<ResponseType<UserListResponseType>>(
    url
  );

  if (keyword) {
    return {
      ...omit(response.data.data, "usersDto"),
      users: response.data.data.usersDto,
    };
  }
  return response.data.data;
}

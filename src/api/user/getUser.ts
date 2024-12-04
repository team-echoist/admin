import { DetailParams } from "../../types/params";
import { ResponseType } from "..";
import { UserType } from ".";
import fetchData from "../fetchData";

export default async function getUser(params: DetailParams) {
  const url = `/admin-management/users/${params.id}`;

  const response = await fetchData<ResponseType<UserType>>({ url });
  return response.data;
}

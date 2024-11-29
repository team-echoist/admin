import AxiosInstance from "../AxiosInstance";
import { DetailParams } from "../../types/params";
import { ResponseType } from "..";
import { UserType } from ".";

export default async function getUser(params: DetailParams) {
  const url = `/admin-management/users/${params.id}`;

  const response = await AxiosInstance.get<ResponseType<UserType>>(url);
  return response.data.data;
}

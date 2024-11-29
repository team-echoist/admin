import AxiosInstance from "../AxiosInstance";
import { DetailParams } from "../../types/params";
import { ManagerType } from ".";
import { ResponseType } from "..";

export default async function getManager(params: DetailParams) {
  const url = `/admin-info/${params.id}`;
  const response = await AxiosInstance.get<ResponseType<ManagerType>>(url);
  return response.data.data;
}

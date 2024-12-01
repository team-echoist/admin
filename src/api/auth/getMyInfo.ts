import AxiosInstance from "../AxiosInstance";
import { ManagerType } from "../manager";
import { ResponseType } from "..";

export default async function getMyInfo() {
  const url = `/admin-info/my`;

  const response = await AxiosInstance.get<ResponseType<ManagerType>>(url);
  return response.data.data;
}

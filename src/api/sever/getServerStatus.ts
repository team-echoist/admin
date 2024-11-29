import AxiosInstance from "../AxiosInstance";
import { ResponseType } from "..";

export type StatusType = "open" | "maintenance" | "closed";

export default async function getServerStatus() {
  const url = `/admin-office/server/status`;

  const response = await AxiosInstance.get<ResponseType<StatusType>>(url);
  return response.data.data;
}

import { ResponseType } from "..";
import fetchData from "../fetchData";

export type StatusType = "open" | "maintenance" | "closed";

export default async function getServerStatus() {
  const url = `/admin-office/server/status`;

  const response = await fetchData<ResponseType<StatusType>>({ url });
  return response.data;
}

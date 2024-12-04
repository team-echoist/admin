import { ManagerType } from "../manager";
import { ResponseType } from "..";
import fetchData from "../fetchData";

export default async function getMyInfo() {
  const url = `/admin-info/my`;

  const response = await fetchData<ResponseType<ManagerType>>({ url });
  return response.data;
}

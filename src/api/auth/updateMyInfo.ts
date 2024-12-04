import { ManagerType } from "../manager";
import fetchData from "../fetchData";

export type UpdateMyInfoBodyType = {
  password: string;
} & Pick<ManagerType, "name" | "email" | "info">;

export default async function updateMyInfo(body: UpdateMyInfoBodyType) {
  const url = `/admin-info`;

  const response = await fetchData({ url, method: "PUT", body });

  return response;
}

import AxiosInstance from "../AxiosInstance";
import { ManagerType } from "../manager";

export type UpdateMyInfoBodyType = {
  password: string;
} & Pick<ManagerType, "name" | "email" | "info">;

export default async function updateMyInfo(body: UpdateMyInfoBodyType) {
  const url = `/admin-info`;

  const response = await AxiosInstance.put(url, body);

  return response;
}

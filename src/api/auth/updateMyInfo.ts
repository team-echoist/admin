import { ManagerType } from "../manager";
import { ResponseType } from "..";
import fetchData from "../fetchData";

export type UpdateMyInfoBodyType = {
  password: string;
} & Pick<ManagerType, "name" | "email" | "info">;

export default async function updateMyInfo(body: UpdateMyInfoBodyType) {
  const url = `/admin-info`;

  const response = await fetchData<ResponseType<unknown>, UpdateMyInfoBodyType>(
    { url, method: "PUT", body }
  );

  return response;
}

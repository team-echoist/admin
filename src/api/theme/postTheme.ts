import AxiosInstance from "../AxiosInstance";
import { ThemeType } from ".";

export type ThemePostBody = Pick<ThemeType, "name" | "price" | "url">;

export default async function postTheme(body: ThemePostBody) {
  const url = `/api/admin-office/stores/themes`;

  const response = await AxiosInstance.post(url, body);

  return response;
}

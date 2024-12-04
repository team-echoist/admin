import { ThemeType } from ".";
import fetchData from "../fetchData";

export type ThemePostBody = Pick<ThemeType, "name" | "price" | "url">;

export default async function postTheme(body: ThemePostBody) {
  const url = `/api/admin-office/stores/themes`;

  const response = await fetchData({ url, body });

  return response;
}

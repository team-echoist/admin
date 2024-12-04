import { ResponseType } from "..";
import { ThemeType } from ".";
import fetchData from "../fetchData";

export type ThemeListResponseType = {
  themes: ThemeType[];
};

export default async function getThemeList() {
  const url = `/admin-office/stores/themes`;

  const response = await fetchData<ResponseType<ThemeListResponseType>>({
    url,
  });

  return response.data;
}

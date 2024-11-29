import AxiosInstance from "../AxiosInstance";
import { ResponseType } from "..";
import { ThemeType } from ".";

export type ThemeListResponseType = {
  themes: ThemeType[];
};

export default async function getThemeList() {
  const url = `/admin-office/stores/themes`;

  const response = await AxiosInstance.get<ResponseType<ThemeListResponseType>>(
    url
  );

  return response.data.data;
}

import AxiosInstance from "../AxiosInstance";
import { ResponseType } from "..";

export type VersionItemType = {
  id: 0;
  appType:
    | "desktop_windows"
    | "desktop_mac"
    | "ios_tablet"
    | "ios_mobile"
    | "android_tablet"
    | "android_mobile";
  version: "string";
  releaseDate: "2024-11-29T17:39:25.091Z";
  createdDate: "2024-11-29T17:39:25.091Z";
  updatedDate: "2024-11-29T17:39:25.091Z";
};

export default async function getVersion() {
  const url = `/admin-office/app/versions`;

  const response = await AxiosInstance.get<ResponseType<VersionItemType[]>>(
    url
  );

  return response.data.data;
}

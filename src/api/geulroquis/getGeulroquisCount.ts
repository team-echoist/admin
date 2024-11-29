import AxiosInstance from "../AxiosInstance";
import { ResponseType } from "..";

export type GeulroquisCountType = {
  total: number;
  available: number;
};

export default async function getGeulroquisCount() {
  const url = `/admin-office/geulroquis/count`;

  const response = await AxiosInstance.get<ResponseType<GeulroquisCountType>>(
    url
  );

  return response.data.data;
}

import { ResponseType } from "..";
import fetchData from "../fetchData";

export type GeulroquisCountType = {
  total: number;
  available: number;
};

export default async function getGeulroquisCount() {
  const url = `/admin-office/geulroquis/count`;

  const response = await fetchData<ResponseType<GeulroquisCountType>>({ url });

  return response.data;
}

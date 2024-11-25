import AxiosInstance from "../AxiosInstance";
import { DetailParams } from "../../types/params";
import { EssayType } from ".";

export default async function getEssayDetail(params: DetailParams) {
  const url = `/admin-management/essays/${params.id}`;

  const response = await AxiosInstance.get<EssayType>(url);
  return response;
}

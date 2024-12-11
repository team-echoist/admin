import { DetailParams } from "../../types/params";
import { ReportType } from ".";
import { ResponseType } from "..";
import fetchData from "../fetchData";

export default async function getReportDetail(params: DetailParams) {
  const url = `/admin-task/reports/${params.id}`;

  const response = await fetchData<ResponseType<ReportType[]>>({ url });
  return response.data;
}

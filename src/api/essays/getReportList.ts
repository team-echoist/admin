import { ResponsePaginationType, ResponseType } from "..";

import { ListParams } from "../../types/params";
import { ReportListType } from ".";
import fetchData from "../fetchData";

export type ReportListResponseType = {
  reports: ReportListType[];
  totalReports: number;
  totalEssay: number;
} & ResponsePaginationType;

export default async function getReportList(params: ListParams) {
  const { page, perPage } = params.pagination;

  const url = `/admin-task/reports?page=${page}&limit=${perPage}`;

  const response = await fetchData<ResponseType<ReportListResponseType>>({
    url,
  });

  return response.data;
}

import { DetailParams, ListParams } from "../types/params";

import getEssayDetail from "../api/essays/getEssayDetail";
import getEssayList from "../api/essays/getEssayList";
import getReportDetail from "../api/essays/getReportDetail";
import getReportList from "../api/essays/getReportList";
import { queryOptions } from "@tanstack/react-query";

const essayQueryOptions = {
  getEssayList: (params: ListParams) =>
    queryOptions({
      queryKey: [
        "essay",
        "list",
        params.pagination.page,
        params.pagination.perPage,
        params.filter?.keyword || "",
      ],
      queryFn: () => getEssayList(params),
    }),
  getEssayDetail: (params: DetailParams) =>
    queryOptions({
      queryKey: ["dashboard", "essays"],
      queryFn: () => getEssayDetail(params),
    }),
  getReportList: (params: ListParams) =>
    queryOptions({
      queryKey: ["report", "list", params],
      queryFn: () => getReportList(params),
    }),
  getReportDetail: (params: DetailParams) =>
    queryOptions({
      queryKey: ["report", params.id],
      queryFn: () => getReportDetail(params),
    }),
};

export default essayQueryOptions;

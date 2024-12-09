import { DetailParams, ListParams } from "../types/params";

import getReportDetail from "../api/report/getReportDetail";
import getReportList from "../api/report/getReportList";
import { queryOptions } from "@tanstack/react-query";

const reportQueryOptions = {
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

export default reportQueryOptions;

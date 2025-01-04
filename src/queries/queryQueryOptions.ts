import { DetailParams, ListParams } from "../types/params";

import getQueryDetail from "../api/query/getQueryDetail";
import getQueryList from "../api/query/getQueryList";
import { queryOptions } from "@tanstack/react-query";

const queryQueryOptions = {
  getQueryList: (params: ListParams) =>
    queryOptions({
      queryKey: [
        "query",
        "list",
        params.pagination.page,
        params.pagination.perPage,
        params.filter?.status,
      ],
      queryFn: () => getQueryList(params),
    }),
  getQueryDetail: (params: DetailParams) =>
    queryOptions({
      queryKey: ["query", "detail", params.id],
      queryFn: () => getQueryDetail(params),
    }),
};

export default queryQueryOptions;

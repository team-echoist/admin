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
        params.filter?.keyword,
      ],
      queryFn: () => getQueryList(params),
    }),
  getQueryDetail: (params: DetailParams) =>
    queryOptions({
      queryKey: ["query", params.id],
      queryFn: () => getQueryDetail(params),
    }),
};

export default queryQueryOptions;

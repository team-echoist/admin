import { DetailParams, ListParams } from "../types/params";

import getNoticeDetail from "../api/notices/getNoticeDetail";
import getNoticeList from "../api/notices/getNoticeList";
import { queryOptions } from "@tanstack/react-query";

const essayQueryOptions = {
  getNoticeList: (params: ListParams) =>
    queryOptions({
      queryKey: ["notice", "list", params],
      queryFn: () => getNoticeList(params),
    }),
  getNoticeDetail: (params: DetailParams) =>
    queryOptions({
      queryKey: ["notice", params],
      queryFn: () => getNoticeDetail(params),
    }),
};

export default essayQueryOptions;

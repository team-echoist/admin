import { DetailParams, ListParams } from "../types/params";

import getEssayDetail from "../api/essays/getEssayDetail";
import getEssayList from "../api/essays/getEssayList";
import { queryOptions } from "@tanstack/react-query";

const essayQueryOptions = {
  getEssayList: (params: ListParams) =>
    queryOptions({
      queryKey: ["essay", "list", params],
      queryFn: () => getEssayList(params),
    }),
  getEssayDetail: (params: DetailParams) =>
    queryOptions({
      queryKey: ["dashboard", "essays"],
      queryFn: () => getEssayDetail(params),
    }),
};

export default essayQueryOptions;

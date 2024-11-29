import { DetailParams, ListParams } from "../types/params";

import getManager from "../api/manager/getManager";
import getManagerList from "../api/manager/getManagerList";
import getManagerLog from "../api/manager/getManagerLog";
import { queryOptions } from "@tanstack/react-query";

const managerQueryOptions = {
  getManager: (params: DetailParams) =>
    queryOptions({
      queryKey: ["dashboard", "managers", params],
      queryFn: () => getManager(params),
    }),
  getManagerList: (params: ListParams) =>
    queryOptions({
      queryKey: ["manager", "list", params],
      queryFn: () => getManagerList(params),
    }),
  getManagerLog: (params: ListParams) =>
    queryOptions({
      queryKey: ["manager", "log", params],
      queryFn: () => getManagerLog(params),
    }),
};

export default managerQueryOptions;

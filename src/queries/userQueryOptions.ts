import { DetailParams, ListParams } from "../types/params";

import getUser from "../api/user/getUser";
import getUserList from "../api/user/getUserList";
import { queryOptions } from "@tanstack/react-query";

const userQueryOptions = {
  getUserList: (params: ListParams) =>
    queryOptions({
      queryKey: ["user", "list", params],
      queryFn: () => getUserList(params),
    }),
  getUserDetail: (params: DetailParams) =>
    queryOptions({
      queryKey: ["dashboard", "user", params],
      queryFn: () => getUser(params),
    }),
};

export default userQueryOptions;

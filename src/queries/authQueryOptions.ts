import getMyInfo from "../api/auth/getMyInfo";
import { queryOptions } from "@tanstack/react-query";

const authQueryOptions = {
  getMyInfo: () =>
    queryOptions({
      queryKey: ["my"],
      queryFn: () => getMyInfo(),
    }),
};

export default authQueryOptions;

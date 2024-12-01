import getCounts from "../api/analysis/getCounts";
import getGraphData from "../api/analysis/getGraphData";
import { queryOptions } from "@tanstack/react-query";

const dashboardQueryOptions = {
  getGraphData: () =>
    queryOptions({
      queryKey: ["dashboard", "graph"],
      queryFn: () => getGraphData(),
    }),
  getCounts: () =>
    queryOptions({
      queryKey: ["dashboard", "counts"],
      queryFn: () => getCounts(),
    }),
};

export default dashboardQueryOptions;

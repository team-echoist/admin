import { ListParams } from "../types/params";
import getGeulroquisCount from "../api/geulroquis/getGeulroquisCount";
import getGeulroquisList from "../api/geulroquis/getGeulroquisList";
import { queryOptions } from "@tanstack/react-query";

const geulroquisQueryOptions = {
  getGeulroquisList: (params: ListParams) =>
    queryOptions({
      queryKey: ["geulroquis", "list", params],
      queryFn: () => getGeulroquisList(params),
    }),
  getGeulroquisCount: () =>
    queryOptions({
      queryKey: ["count", "geulroquis"],
      queryFn: () => getGeulroquisCount(),
    }),
};

export default geulroquisQueryOptions;

import getThemeList from "../api/theme/getThemeList";
import { queryOptions } from "@tanstack/react-query";

const themeQueryOptions = {
  getThemeList: () =>
    queryOptions({
      queryKey: ["theme", "list"],
      queryFn: () => getThemeList(),
    }),
};

export default themeQueryOptions;

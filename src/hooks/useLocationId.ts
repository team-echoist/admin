import { DefaultPaths } from "../router/paths";
import { getParamsFromPath } from "../lib/path.utils";
import { useLocation } from "react-router-dom";

const useLocationId = () => {
  const { pathname } = useLocation();
  const id = +getParamsFromPath(DefaultPaths.QUERY.DETAIL, pathname).id;

  return id;
};

export default useLocationId;

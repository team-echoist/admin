import { ListParams } from "../../types/params";
import getGeulroquisCount from "../../api/geulroquis/getGeulroquisCount";
import getGeulroquisList from "../../api/geulroquis/getGeulroquisList";

export const geulroquisListLoader = async ({
  request,
}: {
  request: Request;
}) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("perPage") || "9";

  const params: ListParams = {
    pagination: { page: Number(page), perPage: Number(perPage) },
  };

  const data = await getGeulroquisList(params);
  const count = await getGeulroquisCount();

  return { data, count };
};

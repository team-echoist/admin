import { ListParams } from "../../types/params";
import getManagerList from "../../api/manager/getManagerList";

export const managerListLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("perPage") || "10";

  const params: ListParams = {
    pagination: { page: Number(page), perPage: Number(perPage) },
  };

  const data = await getManagerList(params);

  return data;
};

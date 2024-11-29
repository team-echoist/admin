import { ListParams } from "../../types/params";
import getManagerLog from "../../api/manager/getManagerLog";

export const managerLogLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("perPage") || "10";

  const params: ListParams = {
    pagination: { page: Number(page), perPage: Number(perPage) },
  };

  const data = await getManagerLog(params);

  return data;
};

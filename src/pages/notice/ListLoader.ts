import { ListParams } from "../../types/params";
import getNoticeList from "../../api/notices/getNoticeList";

export const NoticeListLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("perPage") || "10";

  const params: ListParams = {
    pagination: { page: Number(page), perPage: Number(perPage) },
  };

  const data = await getNoticeList(params);

  return data;
};

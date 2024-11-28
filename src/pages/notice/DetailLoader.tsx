import { DetailParams } from "../../types/params";
import getNoticeDetail from "../../api/notices/getNoticeDetail";

export const noticeDetailLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  const id = url.pathname.split("/").pop();

  if (!id) return;

  const params: DetailParams = { id: Number(id) };

  const data = await getNoticeDetail(params);

  return { data, id };
};

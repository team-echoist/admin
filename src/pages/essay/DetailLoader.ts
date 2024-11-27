import { DetailParams } from "../../types/params";
import getEssayDetail from "../../api/essays/getEssayDetail";

export const essayDetailLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  const id = url.pathname.split("/").pop();

  if (!id) return;

  const params: DetailParams = { id: Number(id) };

  const data = await getEssayDetail(params);

  return { data, id };
};

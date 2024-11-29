import { DetailParams } from "../../types/params";
import getUser from "../../api/user/getUser";

export const userDetailLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  const id = url.pathname.split("/").pop();

  if (!id) return;

  const params: DetailParams = { id: Number(id) };

  const data = await getUser(params);

  return { data, id };
};

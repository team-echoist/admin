import { DetailParams } from "../../types/params";
import getManager from "../../api/manager/getManager";

export const managerDetailLoader = async ({
  request,
}: {
  request: Request;
}) => {
  const url = new URL(request.url);

  const id = url.pathname.split("/").pop();

  if (!id) return;

  const params: DetailParams = { id: Number(id) };

  const data = await getManager(params);

  return { data, id };
};

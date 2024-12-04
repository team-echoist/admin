import { EssayStatusType } from ".";
import fetchData from "../fetchData";

export default async function updateEssayStatus(
  essayId: number,
  status: EssayStatusType
) {
  const url = `/admin-management/essays/${essayId}`;

  const response = await fetchData({ url, method: "PUT", body: { status } });

  return response;
}

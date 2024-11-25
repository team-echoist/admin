import AxiosInstance from "../AxiosInstance";
import { EssayStatusType } from ".";

export default async function updateEssayStatus(
  essayId: number,
  status: EssayStatusType
) {
  const url = `/admin-management/essays/${essayId}`;

  const response = await AxiosInstance.put(url, { status });

  return response;
}

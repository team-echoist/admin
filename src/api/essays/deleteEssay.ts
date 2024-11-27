import AxiosInstance from "../AxiosInstance";

export default async function deleteEssay(essayId: number) {
  const url = `/admin-management/essays/${essayId}`;

  const response = await AxiosInstance.delete(url);

  return response;
}

import fetchData from "../fetchData";

export default async function deleteEssay(essayId: number) {
  const url = `/admin-management/essays/${essayId}`;

  const response = await fetchData({ url, method: "DELETE" });

  return response;
}

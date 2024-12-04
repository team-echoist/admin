import fetchData from "../fetchData";

export default async function putNextGeulroquis(geulroquisId: number) {
  const url = `/admin-office/geulroquis/${geulroquisId}`;

  const response = await fetchData({ url, method: "PUT" });

  return response;
}

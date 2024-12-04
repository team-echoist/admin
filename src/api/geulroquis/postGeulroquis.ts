import fetchData from "../fetchData";

export default async function postGeulroquis(body: FormData) {
  const url = `/admin-office/geulroquis`;

  const response = await fetchData({ url, method: "POST", body });

  return response;
}

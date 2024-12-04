import fetchData from "../fetchData";

export default async function postVersion(versionId: number, version: string) {
  const url = `/admin-office/app/versions/${versionId}`;

  const response = await fetchData({ url, method: "POST", body: { version } });

  return response;
}

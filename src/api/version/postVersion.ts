import AxiosInstance from "../AxiosInstance";

export default async function postVersion(versionId: number, version: string) {
  const url = `/admin-office/app/versions/${versionId}`;

  const response = await AxiosInstance.post(url, { version });

  return response.data.data;
}

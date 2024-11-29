import AxiosInstance from "../AxiosInstance";

export default async function postGeulroquis(body: FormData) {
  const url = `/admin-office/geulroquis`;

  const response = await AxiosInstance.post(url, body);

  return response;
}

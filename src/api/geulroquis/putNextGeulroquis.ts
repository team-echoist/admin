import AxiosInstance from "../AxiosInstance";

export default async function putNextGeulroquis(geulroquisId: number) {
  const url = `/admin-office/geulroquis/${geulroquisId}`;

  const response = await AxiosInstance.put(url);

  return response;
}

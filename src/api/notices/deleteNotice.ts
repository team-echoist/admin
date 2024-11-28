import AxiosInstance from "../AxiosInstance";

export default async function deleteNotice(noticeId: number) {
  const url = `/admin-support/notices/${noticeId}`;

  const response = await AxiosInstance.delete(url);

  return response;
}

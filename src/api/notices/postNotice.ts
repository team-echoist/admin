import AxiosInstance from "../AxiosInstance";

export type NoticeBodyType = {
  title: string;
  content: string;
};

export default async function postNotice(body: NoticeBodyType) {
  const url = `/admin-support/notices`;

  const response = await AxiosInstance.post(url, body);

  return response;
}

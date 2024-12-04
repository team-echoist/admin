import fetchData from "../fetchData";

export default async function deleteNotice(noticeId: number) {
  const url = `/admin-support/notices/${noticeId}`;

  const response = await fetchData({ url, method: "DELETE" });

  return response;
}

import fetchData from "../fetchData";

export default async function deleteUser(userId: number) {
  const url = `/admin-root/users/${userId}`;

  const response = await fetchData({ url, method: "DELETE" });

  return response;
}

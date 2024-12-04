import fetchData from "../fetchData";

export type RegisterBodyType = {
  email: string;
  password: string;
  name: string;
};

export default async function postRegister(registerBody: RegisterBodyType) {
  const url = `/admin-auth/register`;

  const response = await fetchData({ url, method: "POST", body: registerBody });

  return response;
}

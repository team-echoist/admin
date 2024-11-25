import AxiosInstance from "../AxiosInstance";

export type RegisterBodyType = {
  email: string;
  password: string;
  name: string;
};

export default async function postRegister(registerBody: RegisterBodyType) {
  const url = `/admin-auth/register`;

  const response = await AxiosInstance.post(url, registerBody);

  return response;
}

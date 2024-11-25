import AxiosInstance from "../AxiosInstance";

export type LoginBodyType = { email: string; password: string };

export default async function postLogin(loginBody: LoginBodyType) {
  const url = `/admin-auth/login`;

  const response = await AxiosInstance.post(url, loginBody);

  const { accessToken, refreshToken } = response.data.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return response;
}

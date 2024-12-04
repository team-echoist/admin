import { ResponseType } from "..";
import fetchData from "../fetchData";

export type LoginBodyType = { email: string; password: string };

type LoginResponseType = { accessToken: string; refreshToken: string };

export default async function postLogin(loginBody: LoginBodyType) {
  const url = `/admin-auth/login`;

  const response = await fetchData<
    ResponseType<LoginResponseType>,
    LoginBodyType
  >({ url, method: "POST", body: loginBody });

  const { accessToken, refreshToken } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return response;
}

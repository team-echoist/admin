import { AuthPaths, DefaultPaths } from "../router/paths";

import { ResponseErrorType } from "../api";
import getMyInfo from "../api/auth/getMyInfo";
import { redirect } from "react-router-dom";

export default async function authCheckLoader() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return redirect(`/auth/${AuthPaths.LOGIN}`);
  }

  try {
    const isAlreadyRedirected = sessionStorage.getItem("redirected");
    if (isAlreadyRedirected) {
      return null;
    }

    const response = await getMyInfo();
    sessionStorage.setItem("redirected", "true");

    if (response && response.id !== undefined) {
      localStorage.setItem("isRootAccount", `${response.id === 0}`);
      return redirect(`/${DefaultPaths.DASHBOARD}`);
    }
  } catch (e) {
    const error = e as ResponseErrorType;
    if (error.status === 401) {
      localStorage.removeItem("accessToken");
      return redirect("/login");
    }
  }

  return null;
}

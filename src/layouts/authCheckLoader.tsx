import { AuthPaths, DefaultPaths } from "../router/paths";

import getMyInfo from "../api/auth/getMyInfo";
import { redirect } from "react-router-dom";

export default async function authCheckLoader() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return redirect(`/auth/${AuthPaths.LOGIN}`);
  }

  try {
    const isAlreadyRedirected = localStorage.getItem("redirected");
    if (isAlreadyRedirected) {
      return null;
    }

    const response = await getMyInfo();
    localStorage.setItem("redirected", "true");

    if (response && response.id !== undefined) {
      localStorage.setItem("isRootAccount", `${response.id === 0}`);
      return redirect(`/${DefaultPaths.DASHBOARD}`);
    }
  } catch (e) {
    if (e.status === 401) {
      localStorage.removeItem("accessToken");
      return redirect("/login");
    }
  }

  return null;
}

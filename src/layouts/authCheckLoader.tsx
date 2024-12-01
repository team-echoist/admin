import { AuthPaths, DefaultPaths } from "../router/paths";

import { ResponseErrorType } from "../api";
import getUserPermission from "../api/auth/getUserPermission";
import { redirect } from "react-router-dom";

type LoaderContext = "AuthLayout" | "DefaultLayout";

export default async function authCheckLoader(context: LoaderContext) {
  const accessToken = localStorage.getItem("accessToken");

  if (context === "AuthLayout") {
    if (accessToken) {
      try {
        const isAlreadyRedirected = sessionStorage.getItem("redirected");
        if (isAlreadyRedirected) {
          return null;
        }

        const response = await getUserPermission();
        sessionStorage.setItem("redirected", "true");

        if (response && response.id !== undefined) {
          localStorage.setItem("isRootAccount", `${response.id === 0}`);
          return redirect(`/${DefaultPaths.DASHBOARD}`);
        }
      } catch (e) {
        const error = e as ResponseErrorType;
        if (error.status === 401) {
          localStorage.removeItem("accessToken");
          return redirect(`/auth/${AuthPaths.LOGIN}`);
        }
      }
    } else {
      return null;
    }
  } else if (context === "DefaultLayout") {
    if (!accessToken) {
      return redirect(`/auth/${AuthPaths.LOGIN}`);
    }

    try {
      const response = await getUserPermission();
      if (response && response.id !== undefined) {
        localStorage.setItem("isRootAccount", `${response.id === 0}`);
        return null;
      }
    } catch (e) {
      const error = e as ResponseErrorType;
      if (error.status === 401) {
        localStorage.removeItem("accessToken");
        return redirect(`/auth/${AuthPaths.LOGIN}`);
      }
    }
  }

  return null;
}

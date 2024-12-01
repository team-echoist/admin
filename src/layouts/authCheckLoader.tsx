import { AuthPaths, DefaultPaths } from "../router/paths";

import { ResponseErrorType } from "../api";
import getUserPermission from "../api/auth/getUserPermission";
import { redirect } from "react-router-dom";

type LoaderContext = "AuthLayout" | "DefaultLayout";

export default async function authCheckLoader(context: LoaderContext) {
  const accessToken = localStorage.getItem("accessToken");

  const handleUnauthorized = () => {
    localStorage.removeItem("accessToken");
    return redirect(`/auth/${AuthPaths.LOGIN}`);
  };

  if (!accessToken) {
    return context === "DefaultLayout" ? handleUnauthorized() : null;
  }

  try {
    if (sessionStorage.getItem("redirected")) {
      return null;
    }

    const response = await getUserPermission();
    sessionStorage.setItem("redirected", "true");

    if (response?.id !== undefined) {
      localStorage.setItem("isRootAccount", `${response.id === 0}`);
      if (context === "AuthLayout") {
        return redirect(`/${DefaultPaths.DASHBOARD}`);
      }
    }
  } catch (e) {
    const error = e as ResponseErrorType;
    if (error.status === 401) {
      return handleUnauthorized();
    }
  }

  return null;
}

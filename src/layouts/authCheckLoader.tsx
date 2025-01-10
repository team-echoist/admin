import { AuthPaths } from "../router/paths";
import { redirect } from "react-router-dom";

type LoaderContext = "AuthLayout" | "DefaultLayout";

export default async function authCheckLoader(context: LoaderContext) {
  const tokenAvailable = localStorage.getItem("tokenAvailable");
  console.log("hi");
  if (tokenAvailable) {
    redirect("/auth/login");
  }

  const handleUnauthorized = () => {
    localStorage.removeItem("accessToken");
    return redirect(`/auth/${AuthPaths.LOGIN}`);
  };

  if (!tokenAvailable || tokenAvailable === "false") {
    return context === "DefaultLayout" ? handleUnauthorized() : null;
  }

  console.log("dhi");

  return null;
}

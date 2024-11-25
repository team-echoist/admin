import { redirect } from "react-router-dom";

export default function checkAuthLoader() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return redirect("/dashboard");
  }
  return null;
}

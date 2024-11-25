import { redirect } from "react-router-dom";

export default function checkDefaultLoader() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return redirect("/auth/login");
  }
  return null;
}

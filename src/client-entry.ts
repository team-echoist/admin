export async function checkToken() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const headers = new Headers();

  if (refreshToken) {
    headers.append("x-refresh-token", refreshToken);
  }
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }
  headers.append("Content-Type", "application/json");
  try {
    const response = await fetch("https://linkedoutapp.com/api/admin-info/my", {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      sessionStorage.setItem("tokenAvailable", "false");
    }

    if (response.status === 200) {
      const data = await response.json();
      sessionStorage.setItem("tokenAvailable", "true");
      sessionStorage.setItem("root", `${data.data.name === "root"}`);
    } else {
      sessionStorage.setItem("tokenAvailable", "false");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

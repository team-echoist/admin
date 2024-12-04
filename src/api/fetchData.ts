const apiUrl = "https://linkedoutapp.com/api";

type FetchDataProps<T> = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
};

export default async function fetchData<T>({
  url,
  method = "GET",
  body,
}: FetchDataProps<T>): Promise<T> {
  const headers = getAuthHeaders();

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (method === "POST" || method === "PUT") {
    fetchOptions.body = JSON.stringify(body);
    headers.append("Content-Type", "application/json");
  }

  try {
    const response = await fetch(`${apiUrl}${url}`, fetchOptions);

    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }

    if (!response.ok) {
      throw new Error("API 요청에 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("API 요청 에러: ", error);
    throw error;
  }
}

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const headers = new Headers();

  if (refreshToken) {
    headers.append("x-refresh-token", refreshToken);
  }
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
};

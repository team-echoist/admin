import { AuthPaths } from "../router/paths";

const apiUrl = "https://linkedoutapp.com/api";

type ErrorBody = {
  error: string;
  message: string;
};

type FetchDataProps<RequestBodyType> = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: RequestBodyType | ErrorBody;
};

export default async function fetchData<
  ResponseType = unknown,
  RequestBodyType = undefined
>({
  url,
  method = "GET",
  body,
}: FetchDataProps<RequestBodyType>): Promise<ResponseType> {
  const headers = getAuthHeaders();

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (method === "POST" || method === "PUT") {
    if (body instanceof FormData) {
      fetchOptions.body = body;
    } else if (body) {
      fetchOptions.body = JSON.stringify(body);
      headers.append("Content-Type", "application/json");
    }
  }

  try {
    const response = await fetch(`${apiUrl}${url}`, fetchOptions);

    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = `/auth/${AuthPaths.LOGIN}`;
    }

    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }

    if (!response.ok) {
      throw new Error(`${response.status}`);
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

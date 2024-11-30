import AxiosInstance from "../AxiosInstance";
import { ResponseType } from "..";

export default async function getGraphData() {
  const urls = [
    "/admin-dashboard/stats/essays/daily",
    "/admin-dashboard/stats/essays/monthly",
    "/admin-dashboard/stats/users/daily",
    "/admin-dashboard/stats/users/monthly",
    "/admin-dashboard/stats/payments/daily",
    "/admin-dashboard/stats/payments/monthly",
  ];

  try {
    const responses = await Promise.all(
      urls.map((url) =>
        AxiosInstance.get<ResponseType<{ [key: string]: number }>>(url)
      )
    );

    return {
      essays: {
        daily: responses[0].data.data,
        monthly: responses[1].data.data,
      },
      users: {
        daily: responses[2].data.data,
        monthly: responses[3].data.data,
      },
      payments: {
        daily: responses[4].data.data,
        monthly: responses[5].data.data,
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

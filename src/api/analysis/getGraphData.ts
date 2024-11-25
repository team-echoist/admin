import AxiosInstance from "../AxiosInstance";

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
      urls.map((url) => AxiosInstance.get<number>(url))
    );

    return {
      essays: {
        daily: responses[0].data,
        monthly: responses[1].data,
      },
      users: {
        daily: responses[2].data,
        monthly: responses[3].data,
      },
      payments: {
        daily: responses[4].data,
        monthly: responses[5].data,
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

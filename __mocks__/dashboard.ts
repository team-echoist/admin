export const dashboardGraphData = {
  url: "https://linkedoutapp.com/api/admin-dashboard",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {
        totalUser: 1000,
        totalEssays: 2000,
        todaySubscribers: 50,
        todayEssays: 100,
        linkedOutEssays: 300,
        publishedEssays: 400,
        unprocessedReports: 10,
        unprocessedReviews: 5,
      },
    }),
  },
};

export const generateDashboardMonthlyCountMock = (maxValue = 50) => {
  const data = {};
  for (let i = 1; i <= 31; i++) {
    data[i] = Math.floor(Math.random() * (maxValue + 1));
  }
  return { data };
};

export const generateDashboardYearlyCountMock = (maxValue = 50) => {
  const data = {};
  for (let i = 1; i <= 12; i++) {
    data[i] = Math.floor(Math.random() * (maxValue + 1));
  }
  return { data };
};

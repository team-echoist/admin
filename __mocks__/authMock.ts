export const authMock = {
  url: "https://linkedoutapp.com/api/admin-info/my",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {
        total: 60,
        available: 16,
      },
    }),
  },
};

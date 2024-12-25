export const permissionAvailableMock = {
  url: "https://linkedoutapp.com/api/admin-info/my",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {
        id: 0,
        email: "test@example.com",
        name: "테스트",
        profileImage: null,
        activated: true,
        info: null,
      },
    }),
  },
};

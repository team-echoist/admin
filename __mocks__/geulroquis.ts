export const geulroquisCountMock = {
  url: "https://linkedoutapp.com/api/admin-office/geulroquis/count",
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

export const geulroquisListMock = {
  url: "https://linkedoutapp.com/api/admin-office/geulroquis?page=1&limit=10",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {
        quleroquisDto: [
          {
            id: 60,
            url: "https://cdn.linkedoutapp.com/geulroquis/07b67fca-60f0-4ed8-9fae-155568550ca8.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.358+09:00",
          },
          {
            id: 59,
            url: "https://cdn.linkedoutapp.com/geulroquis/dbae42c4-54e0-4175-be44-e304976fb595.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.358+09:00",
          },
          {
            id: 58,
            url: "https://cdn.linkedoutapp.com/geulroquis/879c50fd-851a-4094-ae31-be1dafe94dd2.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.357+09:00",
          },
          {
            id: 57,
            url: "https://cdn.linkedoutapp.com/geulroquis/e2d92ae9-3788-4563-907c-74f659353fde.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.357+09:00",
          },
          {
            id: 56,
            url: "https://cdn.linkedoutapp.com/geulroquis/b8fd0154-0083-45b4-b11c-9260b2e614bb.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.356+09:00",
          },
          {
            id: 55,
            url: "https://cdn.linkedoutapp.com/geulroquis/ac616465-f0ef-493a-a8ae-2541bfc23194.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.355+09:00",
          },
          {
            id: 54,
            url: "https://cdn.linkedoutapp.com/geulroquis/758d75ed-94d6-492e-a922-f28328720993.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.353+09:00",
          },
          {
            id: 53,
            url: "https://cdn.linkedoutapp.com/geulroquis/bc22afd0-1012-4115-b55c-c516992612e7.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.351+09:00",
          },
          {
            id: 52,
            url: "https://cdn.linkedoutapp.com/geulroquis/423716d8-56f0-4080-bab1-c7dcc74b3f0c.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.351+09:00",
          },
          {
            id: 51,
            url: "https://cdn.linkedoutapp.com/geulroquis/b3c1050d-67d0-4399-b869-18ead20d2399.png",
            provided: false,
            current: false,
            next: false,
            providedDate: null,
            createdDate: "2024-11-01T02:41:38.348+09:00",
          },
        ],
        total: 60,
        page: 1,
      },
    }),
  },
};

export const geulroquisDetailMock = {
  url: "https://linkedoutapp.com/api/admin-task/reports?sort=most&page=1&limit=10",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {},
    }),
  },
};

export const reportListMock = {
  url: "https://linkedoutapp.com/api/admin-task/reports?page=1&limit=10",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {
        totalReports: 6,
        totalEssay: 6,
        totalPage: 1,
        page: 1,
        reports: [
          {
            id: 1,
            essayTitle: "Unauthorized Access",
            reportCount: 20,
            oldestReportDate: "2024-12-09T16:21:20.569Z",
          },
          {
            id: 2,
            essayTitle: "Spam Content",
            reportCount: 50,
            oldestReportDate: "2024-12-08T14:15:00.000Z",
          },
          {
            id: 3,
            essayTitle: "Offensive Language",
            reportCount: 10,
            oldestReportDate: "2024-12-07T18:00:00.000Z",
          },
          {
            id: 4,
            essayTitle: "Misinformation",
            reportCount: 5,
            oldestReportDate: "2024-12-06T12:00:00.000Z",
          },
          {
            id: 5,
            essayTitle: "Copyright Infringement",
            reportCount: 15,
            oldestReportDate: "2024-12-05T10:00:00.000Z",
          },
          {
            id: 47,
            essayTitle: "Harassment",
            reportCount: 30,
            oldestReportDate: "2024-12-04T16:00:00.000Z",
          },
          {
            id: 7,
            essayTitle: "Malicious Link",
            reportCount: 45,
            oldestReportDate: "2024-12-03T08:00:00.000Z",
          },
          {
            id: 8,
            essayTitle: "Fake Account",
            reportCount: 0,
            oldestReportDate: "2024-12-02T20:00:00.000Z",
          },
        ],
      },
    }),
  },
};

export const reportDetailMock = {
  url: "https://linkedoutapp.com/api/admin-task/reports/47",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {
        id: 11,
        essayTitle: "제목 없음",
        content: "<p>제목없음</p>",
        reportCount: 0,
        oldestReportDate: "2024-11-01T16:04:18.145+09:00",
        updatedDate: "2024-11-01T16:29:24.215+09:00",
        thumbnail: null,
        views: 0,
        status: "private",
        authorId: 1,
        reports: [],
      },
    }),
  },
};

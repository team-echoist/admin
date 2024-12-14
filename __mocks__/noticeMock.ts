export const noticeListMock = {
  url: "https://linkedoutapp.com/api/admin-support/notices?page=1&limit=10&filter=all",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {
        Notices: [
          {
            id: 1,
            title: "New Feature Released",
            content:
              "We have just released a new feature in the app. Check it out now!",
            createdDate: "2024-12-15T10:00:00Z",
            processor: {
              id: 101,
              email: "johndoe@example.com",
              name: "John Doe",
              profileImage: "https://example.com/images/johndoe.jpg",
              activated: true,
              info: "Senior Developer",
            },
          },
          {
            id: 2,
            title: "Maintenance Notice",
            content:
              "Scheduled maintenance on December 20th. Expect downtime between 2 AM and 4 AM.",
            createdDate: "2024-12-14T14:00:00Z",
            processor: {
              id: 102,
              email: "janedoe@example.com",
              name: "Jane Doe",
              profileImage: "https://example.com/images/janedoe.jpg",
              activated: true,
              info: "System Admin",
            },
          },
          {
            id: 3,
            title: "System Update",
            content:
              "A system update will be rolled out to improve performance and security.",
            createdDate: "2024-12-13T08:30:00Z",
            processor: {
              id: 103,
              email: "emily@example.com",
              name: "Emily Clark",
              profileImage: "https://example.com/images/emilyclark.jpg",
              activated: true,
              info: "Lead Engineer",
            },
          },
          {
            id: 4,
            title: "Holiday Sale Starts Now",
            content:
              "Our holiday sale is live! Enjoy discounts on selected products.",
            createdDate: "2024-12-12T09:15:00Z",
            processor: {
              id: 104,
              email: "michael@example.com",
              name: "Michael Smith",
              profileImage: "https://example.com/images/michael.jpg",
              activated: true,
              info: "Marketing Manager",
            },
          },
          {
            id: 5,
            title: "Security Patch Update",
            content:
              "A critical security patch has been deployed. Please update your software immediately.",
            createdDate: "2024-12-11T16:45:00Z",
            processor: {
              id: 105,
              email: "sarah@example.com",
              name: "Sarah Williams",
              profileImage: "https://example.com/images/sarahwilliams.jpg",
              activated: true,
              info: "Security Specialist",
            },
          },
          {
            id: 6,
            title: "New API Documentation Released",
            content:
              "The new API documentation is now available. Check it out on our developer portal.",
            createdDate: "2024-12-10T11:30:00Z",
            processor: {
              id: 106,
              email: "david@example.com",
              name: "David Johnson",
              profileImage: "https://example.com/images/davidjohnson.jpg",
              activated: true,
              info: "Technical Writer",
            },
          },
          {
            id: 7,
            title: "Bug Fixes in Latest Version",
            content:
              "The latest version includes several important bug fixes. Please update your app.",
            createdDate: "2024-12-09T13:00:00Z",
            processor: {
              id: 107,
              email: "laura@example.com",
              name: "Laura Miller",
              profileImage: "https://example.com/images/lauramiller.jpg",
              activated: true,
              info: "Quality Assurance",
            },
          },
          {
            id: 8,
            title: "Upcoming Webinar on New Features",
            content:
              "Join our upcoming webinar to learn about the new features being added to the platform.",
            createdDate: "2024-12-08T17:00:00Z",
            processor: {
              id: 108,
              email: "tom@example.com",
              name: "Tom Davis",
              profileImage: "https://example.com/images/tomdavis.jpg",
              activated: true,
              info: "Product Manager",
            },
          },
        ],
        total: 8,
        page: 1,
      },
    }),
  },
};

export const noticeDetailMock = {
  url: "https://linkedoutapp.com/api/admin-support/notices/7",
  apiResponse: {
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: {
        id: 7,
        title: "Bug Fixes in Latest Version",
        content:
          "The latest version includes several important bug fixes. Please update your app.",
        createdDate: "2024-12-09T13:00:00Z",
        processor: {
          id: 107,
          email: "laura@example.com",
          name: "Laura Miller",
          profileImage: "https://example.com/images/lauramiller.jpg",
          activated: true,
          info: "Quality Assurance",
        },
      },
    }),
  },
};

export type EssayType = {
  id: 0;
  title: "string";
  content: "string";
  linkedOutGauge: 0;
  createdDate: "2024-10-24T14:48:39.315Z";
  updatedDate: "2024-10-24T14:48:39.315Z";
  thumbnail: "string";
  bookmarks: true;
  views: 0;
  status: "Unknown Type: enum";
  device: "string";
  author: {
    id: 0;
    email: "string";
    nickname: "string";
    password: "string";
    gender: "string";
    profileImage: "string";
    birthDate: "2024-10-24T14:48:39.315Z";
    platform: "string";
    platformId: "string";
    role: "string";
    status: EssayStatusType;
    reputation: 0;
    subscriptionEnd: "2024-10-24T14:48:39.315Z";
    createdDate: "2024-10-24T14:48:39.315Z";
    updatedDate: "2024-10-24T14:48:39.315Z";
    deactivationDate: "2024-10-24T14:48:39.315Z";
    deletedDate: "2024-10-24T14:48:39.315Z";
  };
  story: {
    id: 0;
    name: "string";
    createdDate: "2024-10-24T14:48:39.315Z";
    updatedDate: "2024-10-24T14:48:39.315Z";
  };
  trandScore: 0;
  reports: [
    {
      id: 0;
      reason: "string";
    }
  ];
};

export type EssayListType = Pick<
  EssayType,
  "id" | "title" | "createdDate" | "views"
> & {
  author: Pick<EssayType["author"], "nickname">;
};

export type EssayStatusType = "private" | "published" | "linkedout";

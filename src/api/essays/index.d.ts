import { AuthorType } from "..";

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
  author: AuthorType;
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

export type ReportType = {
  id: number;
  essayTitle: string;
  reportCount: string;
  oldestReportDate: string;
  count: number;
  createdDate: string;
  id: number;
  processed: boolean;
  processedDate: null | string;
  reason: string;
  reporterId: number;
};

export type ReportListType = Pick<
  ReportType,
  "id" | "essayTitle" | "reportCount" | "oldestReportDate"
>;

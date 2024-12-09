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

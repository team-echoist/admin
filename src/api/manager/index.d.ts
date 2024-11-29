import { ProcessorType } from "..";

export type ManagerType = {
  id: number;
  email: string;
  name: string;
  profileImage: null | string;
  activated: boolean;
  info: null;
};

export type ManagerListType = ManagerType;

export type ManagerLogType = {
  id: number;
  actionType: "updated";
  target: "notice";
  comment: null;
  processor: ProcessorType;
  processedDate: "2024-11-29T03:39:57.434+09:00";
  report: null;
  review: null;
  user: null;
  essay: null;
  notice: null;
  inquiry: null;
};

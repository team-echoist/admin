import { AuthorType } from "..";

export type QueryType = {
  id: number;
  createdDate: "2025-01-04T19:38:11.707+09:00";
  processed: boolean;
  title: string;
  user: AuthorType;
  answer: null | string;
  type: "기술 지원 관련";
  content: string;
};

export type QueryListType = Pick<
  QueryType,
  "id" | "title" | "processed",
  "user"
>;

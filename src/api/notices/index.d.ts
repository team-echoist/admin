import { AuthorType } from "..";

export type NoticeType = {
  id: string;
  title: string;
  content: string;
  author: AuthorType;
};

export type NoticeType = {
  id?: number;
  title: string;
  content: string;
  createdDate: string;
  processor: {
    id: number;
    email: string;
    name: string;
    profileImage: string;
    activated: true;
    info: null | string;
  };
};

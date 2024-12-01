import AxiosInstance from "../AxiosInstance";
import { ResponseType } from "..";

export default async function getCounts() {
  const url = `/admin-dashboard`;

  const response = await AxiosInstance.get<ResponseType<ResponseGetCounts>>(
    url
  );
  return response.data.data;
}

type ResponseGetCounts = {
  totalUser: 0;
  currentSubscriber: 0;
  todaySubscribers: 0;
  totalEssays: 0;
  todayEssays: 0;
  publishedEssays: 0;
  linkedOutEssays: 0;
  unprocessedReports: 0;
  unprocessedReviews: 0;
};

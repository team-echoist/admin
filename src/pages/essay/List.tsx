import { AxiosResponse } from "axios";
import essayQueryOptions from "../../queries/essayQueryOptions";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const EssayList = () => {
  const initialData = useLoaderData() as AxiosResponse;

  const { data, error, isLoading } = useQuery({
    ...essayQueryOptions.getEssayList({ pagination: { page: 1, perPage: 10 } }),
    initialData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>{error.message}</div>;

  console.log(data);
  return <main>에세이 리스트 페이지</main>;
};

export default EssayList;

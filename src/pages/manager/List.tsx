import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";
import { Link, useLoaderData } from "react-router-dom";

import List from "../../components/List";
import { ManagerListResponseType } from "../../api/manager/getManagerList";
import { ManagerListType } from "../../api/manager";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import managerQueryOptions from "../../queries/managerQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";

const columns = ["관리자 ID", "관리자 닉네임", "관리자 이메일", "관리자 상태"];

export default function ManagerList() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <ManagerListContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

const ManagerListContent = () => {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const initialData = useLoaderData<ManagerListResponseType>();
  const { currentPage, handlePaginationEvent } = usePagination();

  const { data, error, isLoading } = useQuery({
    ...managerQueryOptions.getManagerList({
      pagination: { page: currentPage, perPage: 10 },
    }),
    initialData,
  });

  if (isLoading) {
    setAPILoading();
    return;
  }
  if (error instanceof Error) {
    setAPIError(error.message);
    return;
  }

  return (
    <List>
      <List.Header totalCount={data.total} label="관리자" />
      <List.ColumnContainer headers={columns} row={4} />
      <List.RowContainer row={10}>
        {data.admins.map((admin) => (
          <ManagerListItem key={admin.id} {...admin} />
        ))}
      </List.RowContainer>
      <Pagination
        totalPages={data.totalPage}
        currentPage={currentPage}
        handlePaginationEvent={handlePaginationEvent}
      />
    </List>
  );
};

type ManagerListItemProps = ManagerListType;

const ManagerListItem = ({
  id,
  email,
  name,
  activated,
}: ManagerListItemProps) => {
  return (
    <Link
      to={`/managers/${id}`}
      className="grid grid-cols-4 items-center h-[50px] m-[10px] hover:bg-lightGray rounded-[8px]"
    >
      <div className="text-center">{id}</div>
      <div className="text-center">{name}</div>
      <div className="text-center">{email}</div>
      <div className="text-center">{activated ? "활성화" : "비활성화"}</div>
    </Link>
  );
};

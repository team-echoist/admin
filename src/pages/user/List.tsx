import APIErrorProvider, {
  useAPIError,
} from "../../components/fallback/APIErrorProvider";
import APILoadingProvider, {
  useAPILoading,
} from "../../components/fallback/APILoadingProvider";
import { Link, useLoaderData } from "react-router-dom";

import KeywordSearch from "../../components/Filter/KeywordSearch";
import List from "../../components/List";
import Pagination from "../../components/Pagination";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import { UserListResponseType } from "../../api/user/getUserList";
import { UserType } from "../../api/user";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import userQueryOptions from "../../queries/userQueryOptions";

export default function UserList() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <UserListContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

const userListColumns = [
  "사용자 ID",
  "사용자 닉네임",
  "사용자 이메일",
  "사용자 상태",
  "가입날짜",
];
const UserListContent = () => {
  const { setAPIError } = useAPIError();
  const { setAPILoading } = useAPILoading();
  const initialData = useLoaderData<UserListResponseType>();
  const [userSearchKeyword, setUserSearchKeyword] = useState("");
  const { currentPage, handlePaginationEvent } = usePagination();

  const { data, error, isLoading } = useQuery({
    ...userQueryOptions.getUserList({
      pagination: { page: currentPage, perPage: 10 },
      filter: { keyword: userSearchKeyword },
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
      <List.Header totalCount={data.total} label="사용자">
        <KeywordSearch
          placeholder="이메일을 입력하세요"
          keyword={userSearchKeyword}
          onKeywordChange={setUserSearchKeyword}
        />
      </List.Header>
      <List.ColumnContainer headers={userListColumns} row={5} />
      <List.RowContainer row={10}>
        {data.users.map((user) => (
          <UserListItem key={user.id} {...user} />
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

function UserListItem({ id, nickname, email, status, createdDate }: UserType) {
  return (
    <Link
      to={`/users/${id}`}
      className="grid grid-cols-5 items-center h-[50px] m-[10px] hover:bg-lightGray rounded-[8px]"
    >
      <div className="text-center">{id}</div>
      <div className="text-center">{nickname}</div>
      <div className="text-center">{email}</div>
      <div className="text-center">{status}</div>
      <div className="text-center">{createdDate.toString()}</div>
    </Link>
  );
}

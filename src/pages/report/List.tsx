import Blank from "../../components/fallback/Blank";
import ErrorFallback from "../../components/fallback/ErrorFallback";
import { Link } from "react-router-dom";
import List from "../../components/List";
import LoadingFallback from "../../components/fallback/LoadingFallback";
import Pagination from "../../components/Pagination";
import { ReportListType } from "../../api/essays";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import essayQueryOptions from "../../queries/essayQueryOptions";
import usePagination from "../../components/Pagination/usePagination";
import { useQuery } from "@tanstack/react-query";

const ReportListColumns = [
  "ID",
  "에세이 제목",
  "레포트 수",
  "레포트 작성 일자",
];

export default function ReportList() {
  return (
    <UIErrorBoundary>
      <ReportListContent />
    </UIErrorBoundary>
  );
}

const ReportListContent = () => {
  const { currentPage, handlePaginationEvent } = usePagination();

  const { data, error, isLoading } = useQuery({
    ...essayQueryOptions.getReportList({
      pagination: { page: currentPage, perPage: 10 },
    }),
  });

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <ErrorFallback />;
  }

  if (!data) {
    return <Blank />;
  }

  return (
    <List>
      <List.Header totalCount={data.total} label="에세이" />
      <List.ColumnContainer headers={ReportListColumns} row={5} />
      <List.RowContainer row={10}>
        {data.reports.map((report) => (
          <ReportListItem key={report.id} {...report} />
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

type ReportListItemProps = ReportListType;

const ReportListItem = ({
  id,
  essayTitle,
  reportCount,
  oldestReportDate,
}: ReportListItemProps) => {
  return (
    <Link
      to={`/essays/${id}#reports`}
      className="grid grid-cols-5 items-center h-[50px] m-[10px] hover:bg-lightGray rounded-[8px]"
    >
      <div className="text-center">{id}</div>
      <div className="text-center">{essayTitle}</div>
      <div className="text-center">{reportCount}</div>
      <div className="text-center">{oldestReportDate}</div>
    </Link>
  );
};

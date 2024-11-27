import { cn } from "../../lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToNext: () => void;
  goToPrev: () => void;
  goToPageIndex: (index: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  goToNext,
  goToPageIndex,
  goToPrev,
}: PaginationProps) => {
  const show_page = getPaginationItemArray(currentPage, totalPages);

  return (
    <div id="pagination" className="m-auto flex gap-[15px]">
      <button id="prevBtn" onClick={goToPrev}>
        이전
      </button>
      <div className="flex gap-[10px]">
        {show_page.map((page) => (
          <button
            key={page}
            className={cn(
              "px-[10px] py-[5px] rounded-[8px]",
              currentPage === page ? "bg-lightblue" : ""
            )}
            onClick={() => {
              goToPageIndex(page);
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <button id="nextBtn" onClick={goToNext}>
        다음
      </button>
    </div>
  );
};

export default Pagination;

function getPaginationItemArray(currentPage: number, totalPage: number) {
  const startPage = Math.max(1, currentPage - 2);
  const endPage = totalPage > 5 ? Math.max(5, currentPage + 2) : totalPage;

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
}

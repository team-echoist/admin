import { PaginationEvent } from "./pagination";
import { cn } from "../../lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePaginationEvent: (event: PaginationEvent) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  handlePaginationEvent,
}: PaginationProps) => {
  const show_page = getPaginationItemArray(currentPage, totalPages);

  return (
    <div id="pagination" className="m-auto flex gap-[15px]">
      <button
        id="prevBtn"
        data-testid="prevBtn"
        disabled={currentPage === 1}
        onClick={() => {
          handlePaginationEvent({ type: "click_prev_btn" });
        }}
      >
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
              handlePaginationEvent({ type: "jump_to_page", page });
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        id="nextBtn"
        data-testid="nextBtn"
        disabled={currentPage === totalPages}
        onClick={() => {
          handlePaginationEvent({ type: "click_next_btn" });
        }}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;

function getPaginationItemArray(
  currentPage: number,
  totalPage: number,
  SIZE = 10
) {
  const startPage = Math.floor((currentPage - 1) / SIZE) * SIZE + 1;

  const endPage =
    totalPage === 0 ? 1 : Math.min(startPage + SIZE - 1, totalPage);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
}

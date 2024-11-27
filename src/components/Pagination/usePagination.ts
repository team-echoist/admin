import type { ExceptPaginationEvent, PaginationEvent } from "./pagination.d.ts";

import { useState } from "react";

export default function usePagination(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationEvent = (
    event: PaginationEvent | ExceptPaginationEvent
  ) => {
    switch (event.type) {
      case "click_next_btn":
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        break;
      case "click_prev_btn":
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        break;
      case "jump_to_page":
        setCurrentPage(event.page);
        break;
      default:
        console.log("이벤트 에러 발생");
        break;
    }
  };
  return { currentPage, handlePaginationEvent };
}

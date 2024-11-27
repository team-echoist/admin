import { useState } from "react";

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const goToNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPageIndex = (page: number) => {
    setCurrentPage(page);
  };
  return { currentPage, goToNext, goToPrev, goToPageIndex };
}

import type { Meta } from "@storybook/react";
import Pagination from ".";
import usePagination from "./usePagination";

const meta: Meta = {
  title: "components/pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;

const PaginationStory: React.FC = () => {
  const { currentPage, handlePaginationEvent } = usePagination();

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={50}
      handlePaginationEvent={handlePaginationEvent}
    />
  );
};

export const Default = {
  render: () => <PaginationStory />,
};

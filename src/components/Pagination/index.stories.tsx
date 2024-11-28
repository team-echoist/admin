import type { Meta } from "@storybook/react";
import Pagination from ".";
import usePagination from "./usePagination";

const meta: Meta = {
  title: "components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;

const PaginationStory: React.FC = () => {
  const { currentPage, handlePaginationEvent } = usePagination(50);

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

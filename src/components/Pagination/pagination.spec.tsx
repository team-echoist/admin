import { fireEvent, render, screen } from "@testing-library/react";

import Pagination from ".";
import { PaginationEvent } from "./pagination";

describe("페이지네이션 동작 테스트", () => {
  const handlePaginationEvent = jest.fn((event: PaginationEvent) => {
    console.log(event.type);
  });

  const setup = (currentPage: number, totalPages: number) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePaginationEvent={handlePaginationEvent}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("10단위로 페이지 이동 버튼을 보여준다", () => {
    setup(11, 15);

    expect(screen.getByText(11)).toBeInTheDocument();
    expect(screen.queryByText(8)).toBeNull();
  });

  it("#nextBtn 버튼을 누르면 다음 페이지로 이동한다", () => {
    setup(1, 5);
    const nextButton = screen.getByTestId("nextBtn");
    fireEvent.click(nextButton);

    expect(handlePaginationEvent).toHaveBeenCalledWith({
      type: "click_next_btn",
    });
  });

  it("#prevBtn 버튼을 누르면 이전 페이지로 이동한다", () => {
    setup(2, 5);
    const prevButton = screen.getByTestId("prevBtn");
    fireEvent.click(prevButton);

    expect(handlePaginationEvent).toHaveBeenCalledWith({
      type: "click_prev_btn",
    });
  });

  it("페이지 3 버튼을 누르면 3페이지로 이동한다", () => {
    setup(1, 5);

    const pageButton = screen.getByText(3);
    fireEvent.click(pageButton);

    expect(handlePaginationEvent).toHaveBeenCalledWith({
      type: "jump_to_page",
      page: 3,
    });
  });
});

describe("페이지네이션 예외 처리 테스트", () => {
  const handlePaginationEvent = jest.fn();

  const setup = (currentPage: number, totalPages: number) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePaginationEvent={handlePaginationEvent}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("1페이지에서 #prevBtn 클릭 시 아무 동작도 하지 않아야 한다", () => {
    setup(1, 5);

    const prevButton = screen.getByTestId("prevBtn");
    fireEvent.click(prevButton);

    expect(handlePaginationEvent).not.toHaveBeenCalled();
  });

  it("마지막 페이지에서 #nextBtn 클릭 시 아무 동작도 하지 않아야 한다", () => {
    setup(5, 5);

    const nextButton = screen.getByTestId("nextBtn");
    fireEvent.click(nextButton);

    expect(handlePaginationEvent).not.toHaveBeenCalled();
  });
});

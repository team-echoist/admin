import { expect, test } from "@chromatic-com/playwright";

import { noticeListMock } from "../__mocks__/noticeMock";

test.describe("공지사항 리스트 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });
    await page.goto("http://localhost:5173/notices");

    await page.route(noticeListMock.url, (route) =>
      route.fulfill(noticeListMock.apiResponse)
    );
  });

  test("공지사항 리스트 페이지를 보여준다.", async ({ page }) => {
    await expect(page.getByText("총 공지사항 수 8")).toBeVisible();
  });

  test("공지사항를 클릭하면 에세이 해당 에세이의 페이지로 이동한다", async ({
    page,
  }) => {
    await page.click('a:has-text("7")');

    await page.goto("http://localhost:5173/notices/7");

    await expect(page).toHaveURL("http://localhost:5173/notices/7");
  });

  test("공지사항 작성하기를 클릭하면 작성 폼을 보여준다", async ({ page }) => {
    await page.click('button:has-text("공지사항 작성하기")');

    await expect(
      page.getByRole("heading", { name: "공지사항 작성하기" })
    ).toBeVisible();
  });
});

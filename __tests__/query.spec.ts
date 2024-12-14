import { expect, test } from "@chromatic-com/playwright";

import { reportListMock } from "../__mocks__/reportMock";

test.describe("문의사항 리스트 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });
    await page.goto("http://localhost:5173/query");

    await page.route(reportListMock.url, (route) =>
      route.fulfill(reportListMock.apiResponse)
    );
  });

  test("문의사항 리스트 페이지를 보여준다.", async ({ page }) => {
    await expect(page.getByText("총 에세이 수 6")).toBeVisible();
    await expect(page.getByText("총 레포트 수 6")).toBeVisible();
  });

  test("문의사항를 클릭하면 에세이 해당 에세이의 페이지로 이동한다", async ({
    page,
  }) => {
    await page.click('a:has-text("6")');

    await page.goto("http://localhost:5173/essays/47#report");

    await expect(page).toHaveURL("http://localhost:5173/essay/47#report");
  });
});

test.describe("문의사항 디테일 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });
    await page.goto("http://localhost:5173/query");

    await page.route(reportListMock.url, (route) =>
      route.fulfill(reportListMock.apiResponse)
    );
  });

  test("문의사항 디테일 리스트 페이지를 보여준다.", async ({ page }) => {});

  test("문의사항를 클릭하면 답변 폼을 보여준다", async ({ page }) => {});
});

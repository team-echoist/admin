import { expect, test } from "@chromatic-com/playwright";

import { reportListMock } from "../__mocks__/reportMock";

test.describe("레포트 리스트 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });
    await page.goto("http://localhost:5173/reports");

    await page.route(reportListMock.url, (route) =>
      route.fulfill(reportListMock.apiResponse)
    );
  });

  test("레포트 리스트 페이지를 보여준다.", async ({ page }) => {
    await expect(page.getByText("총 에세이 수 6")).toBeVisible();
    await expect(page.getByText("총 레포트 수 6")).toBeVisible();
  });

  test("레포트를 클릭하면 에세이 해당 에세이의 페이지로 이동한다", async ({
    page,
  }) => {
    await page.click('a:has-text("6")');

    await page.goto("http://localhost:5173/essays/47");

    await expect(page).toHaveURL("http://localhost:5173/essay/47");
  });
});

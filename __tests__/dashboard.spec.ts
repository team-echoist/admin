import {
  dashboardGraphData,
  generateDashboardMonthlyCountMock,
  generateDashboardYearlyCountMock,
} from "../__mocks__/dashboard";
import { expect, test } from "@playwright/test";

test.describe("대시보드 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });
    await page.goto("http://localhost:5173/dashboard");

    await page.route("https://linkedoutapp.com/api/admin-info/my", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            id: 0,
            email: "test@example.com",
            name: "테스트",
            profileImage: null,
            activated: true,
            info: null,
          },
        }),
      })
    );
    await page.route(dashboardGraphData.url, (route) =>
      route.fulfill(dashboardGraphData.apiResponse)
    );
    await page.route(
      "https://linkedoutapp.com/api/admin-dashboard/stats/essays/daily",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(generateDashboardMonthlyCountMock()),
        })
    );

    await page.route(
      "https://linkedoutapp.com/api/admin-dashboard/stats/essays/monthly",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(generateDashboardYearlyCountMock()),
        })
    );

    await page.route(
      "https://linkedoutapp.com/api/admin-dashboard/stats/payments/daily",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(generateDashboardMonthlyCountMock()),
        })
    );

    await page.route(
      "https://linkedoutapp.com/api/admin-dashboard/stats/payments/monthly",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(generateDashboardYearlyCountMock()),
        })
    );

    await page.route(
      "https://linkedoutapp.com/api/admin-dashboard/stats/users/daily",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(generateDashboardMonthlyCountMock()),
        })
    );

    await page.route(
      "https://linkedoutapp.com/api/admin-dashboard/stats/users/monthly",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(generateDashboardYearlyCountMock()),
        })
    );
  });

  test("대시보드 페이지가 렌더링된다.", async ({ page }) => {
    await expect(page.locator("h3")).toContainText("년 통계");

    await expect(page.locator("text=TOTAL에세이 수2000")).toBeVisible();
    await expect(page.locator("text=TODAY에세이 수100")).toBeVisible();
  });

  test("MONTH 버튼 클릭 시 일별 데이터가 보인다.", async ({ page }) => {
    await page.click('button:text("Month")');

    const today = new Date();
    const expectedTitle = `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 통계`;
    await expect(page.locator("h3")).toHaveText(expectedTitle);
  });

  test("YEAR 버튼 클릭 시 월별 데이터가 보인다.", async ({ page }) => {
    await page.click('button:text("Year")');

    const today = new Date();
    const expectedTitle = `${today.getFullYear()}년 통계`;
    await expect(page.locator("h3")).toHaveText(expectedTitle);

    await expect(page.locator("text=에세이 작성 수")).toBeVisible();
    await expect(page.locator("text=유저 가입 수")).toBeVisible();
    await expect(page.locator("text=구독자 수").nth(1)).toBeVisible();
  });
});

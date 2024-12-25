import { expect, test } from "@chromatic-com/playwright";
import {
  managerHistoryListMock,
  managerListMock,
} from "../__mocks__/managerMock";

import { permissionAvailableMock } from "../__mocks__/permissionMock";

test.describe("관리자 목록 페이지", () => {
  test.beforeEach(async ({ context, page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });

    await context.route(permissionAvailableMock.url, (route) =>
      route.fulfill(permissionAvailableMock.apiResponse)
    );

    await page.goto("http://localhost:5173/managers");

    await page.route(managerListMock.url, (route) =>
      route.fulfill(managerListMock.apiResponse)
    );
  });

  test("관리자 목록 페이지를 보여준다.", async ({ page }) => {
    await expect(page.getByText("총 관리자 수 5")).toBeVisible();
  });

  test("관리자를 클릭하면 에세이 해당 관리자의 페이지로 이동한다", async ({
    page,
  }) => {
    await page.click('div:has-text("정아현")');

    await page.goto("http://localhost:5173/managers/2");

    await expect(page).toHaveURL("http://localhost:5173/managers/2");
  });
});

test.describe("관리자 로그 리스트 페이지", () => {
  test.beforeEach(async ({ context, page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });

    await context.route(permissionAvailableMock.url, (route) =>
      route.fulfill(permissionAvailableMock.apiResponse)
    );
    await page.goto("http://localhost:5173/manager-history");

    await page.route(managerHistoryListMock.url, (route) =>
      route.fulfill(managerHistoryListMock.apiResponse)
    );
  });

  test("관리자 로그 리스트 페이지를 보여준다.", async ({ page }) => {
    await expect(page.getByText("활동 내용")).toBeVisible();
  });
});

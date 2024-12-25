import { expect, test } from "@chromatic-com/playwright";
import { userDetailMock, userListMock } from "../__mocks__/userMock";

import { permissionAvailableMock } from "../__mocks__/permissionMock";

test.describe("사용자 리스트 페이지", () => {
  test.beforeEach(async ({ context, page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });

    await context.route(permissionAvailableMock.url, (route) =>
      route.fulfill(permissionAvailableMock.apiResponse)
    );

    await page.goto("http://localhost:5173/users");

    await page.route(userListMock.url, (route) =>
      route.fulfill(userListMock.apiResponse)
    );
  });

  test("사용자 리스트 페이지를 보여준다.", async ({ page }) => {
    await expect(page.getByText("총 사용자 수 8")).toBeVisible();
  });

  test("각 사용자를 클릭하면 개별 페이지로 이동한다", async ({ page }) => {
    await page.click('a:has-text("8")');

    await page.goto("http://localhost:5173/users/8");
  });
});

test.describe("사용자 디테일 페이지 테스트", () => {
  test.beforeEach(async ({ context, page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });

    await context.route(permissionAvailableMock.url, (route) =>
      route.fulfill(permissionAvailableMock.apiResponse)
    );

    await page.goto("http://localhost:5173/users/1");

    await page.route(userDetailMock.url, (route) =>
      route.fulfill(userDetailMock.apiResponse)
    );
  });
  test("에세이 디테일 페이지를 보여준다.", async ({ page }) => {
    await page.goto("http://localhost:5173/users/1");

    await expect(page.getByText("사용자 ID")).toBeVisible();
    await expect(page.getByText("사용자 이메일")).toBeVisible();
    await expect(page.getByText("계정상태")).toBeVisible();
  });
});

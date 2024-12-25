import { essayDetailMock, essayListMock } from "../__mocks__/essayMock";
import { expect, test } from "@chromatic-com/playwright";

import { authMock } from "../__mocks__/authMock";
import { permissionAvailableMock } from "../__mocks__/permissionMock";
import { reportDetailMock } from "../__mocks__/reportMock";

test.describe("에세이 리스트 페이지", () => {
  test.beforeEach(async ({ context, page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });

    await context.route(permissionAvailableMock.url, (route) =>
      route.fulfill(permissionAvailableMock.apiResponse)
    );

    await page.goto("http://localhost:5173/essays");

    await page.route(essayListMock.url, (route) =>
      route.fulfill(essayListMock.apiResponse)
    );
  });

  test("에세이 리스트 페이지를 보여준다.", async ({ page }) => {
    await expect(page.getByText("총 에세이 수 47")).toBeVisible();
  });

  test("에세이를 클릭하면 개별 페이지로 이동한다", async ({ page }) => {
    await page.click('a:has-text("47")');

    await page.goto("http://localhost:5173/essays/47");

    await expect(page).toHaveURL("http://localhost:5173/essays/47");
  });
});

test.describe("에세이 디테일 페이지 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });
    await page.goto("http://localhost:5173/essays/47");
    await page.route(essayDetailMock.url, (route) =>
      route.fulfill(essayDetailMock.apiResponse)
    );
    await page.route(authMock.url, (route) =>
      route.fulfill(authMock.apiResponse)
    );
    await page.route(reportDetailMock.url, (route) =>
      route.fulfill(reportDetailMock.apiResponse)
    );
  });
  test("에세이 디테일 페이지를 보여준다.", async ({ page }) => {
    await page.goto("http://localhost:5173/essays/47");

    await expect(page.getByText("작성자 ID")).toBeVisible();
    await expect(page.getByText("제목")).toBeVisible();
    await expect(page.getByText("내용")).toBeVisible();
  });
});

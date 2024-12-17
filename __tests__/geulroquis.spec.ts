import { expect, test } from "@chromatic-com/playwright";
import {
  geulroquisCountMock,
  geulroquisListMock,
} from "../__mocks__/geulroquis";

test.describe("글로키 리스트 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });

    await page.goto("http://localhost:5173/geulroquis");

    await page.route(geulroquisListMock.url, (route) =>
      route.fulfill(geulroquisListMock.apiResponse)
    );
    await page.route(geulroquisCountMock.url, (route) =>
      route.fulfill(geulroquisCountMock.apiResponse)
    );
  });

  test("글로키 리스트 페이지를 보여준다.", async ({ page }) => {
    await expect(
      page.getByText(" 총 글로키 수 60 / 이용가능 글로키수 16")
    ).toBeVisible();
  });

  test("글로키를 클릭하면 다음 글로키를 지정할 수 있는 폼을 보여준다", async ({
    page,
  }) => {
    await page.route(geulroquisListMock.url, (route) =>
      route.fulfill(geulroquisListMock.apiResponse)
    );
    await page.route(geulroquisCountMock.url, (route) =>
      route.fulfill(geulroquisCountMock.apiResponse)
    );
    await page.click('div:has-text("#60")');

    await expect(page.getByText("다음 글로키 지정하기")).toBeVisible();
  });

  test("글로키 업로드하기를 클릭하면 다음 글로키를 지정할 수 있는 폼을 보여준다", async ({
    page,
  }) => {
    await page.route(geulroquisListMock.url, (route) =>
      route.fulfill(geulroquisListMock.apiResponse)
    );
    await page.route(geulroquisCountMock.url, (route) =>
      route.fulfill(geulroquisCountMock.apiResponse)
    );
    await page.click('button:has-text("글로키 업로드하기")');

    await expect(
      page.getByRole("heading", { name: "글로키 업로드하기" })
    ).toBeVisible();
  });
});

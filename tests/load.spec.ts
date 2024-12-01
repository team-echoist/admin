import { expect, test } from "@playwright/test";

test.describe("페이지 접근 리다이렉트 테스트", () => {
  test("토큰이 없는 유저 접근 시 로그인 페이지로 리다이렉트한다.", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("accessToken");
    });

    await page.goto("http://localhost:5173/");

    await expect(page).toHaveURL("http://localhost:5173/auth/login");
  });

  test("유효 토큰인 경우 대시보드 페이지로 리다이렉트 한다", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });

    await page.route("https://linkedoutapp.com/api/admin-info/my", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          status: 200,
          data: { id: 0 },
        }),
      });
    });
    await page.route(
      " https://linkedoutapp.com/api/admin-office/server/status",
      (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            status: 200,
            data: "open",
          }),
        });
      }
    );

    await page.goto("http://localhost:5173/auth/login");

    await expect(page).toHaveURL("http://localhost:5173/dashboard");
  });

  test("유효하지 않은 토큰인 경우 로그인 페이지로 리다이렉트 한다", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });

    await page.route("https://linkedoutapp.com/api/admin-info/my", (route) => {
      route.fulfill({
        status: 401,
      });
    });

    await page.goto("http://localhost:5173/");

    await expect(page).toHaveURL("http://localhost:5173/auth/login");
  });
});

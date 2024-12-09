import { expect, test } from "@chromatic-com/playwright";

test.describe("사용자 리스트 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });
    await page.goto("http://localhost:5173/users");

    await page.route(
      "https://linkedoutapp.com/api/admin-management/users?page=1&limit=10&filter=all",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              users: [
                {
                  id: 8,
                  email: "daechan476@gmail.com",
                  nickname: "일일구",
                  gender: null,
                  profileImage:
                    "https://cdn.linkedoutapp.com/service/profile_icon_01.png",
                  birthDate: null,
                  platform: "google",
                  platformId: "111195916203222344269",
                  status: "activated",
                  reputation: 0,
                  subscriptionEnd: null,
                  createdDate: "2024-11-25T13:10:23.229+09:00",
                  updatedDate: "2024-11-25T13:10:23.229+09:00",
                  deactivationDate: null,
                  deletedDate: null,
                },
                {
                  id: 7,
                  email: "20241125T041014_daechan476@gmail.com",
                  nickname: "deleted_user",
                  gender: null,
                  profileImage:
                    "https://cdn.linkedoutapp.com/service/profile_icon_01.png",
                  birthDate: null,
                  platform: null,
                  platformId: null,
                  status: "deactivated",
                  reputation: 0,
                  subscriptionEnd: null,
                  createdDate: "2024-11-22T14:39:00.905+09:00",
                  updatedDate: "2024-11-25T13:10:14.824+09:00",
                  deactivationDate: null,
                  deletedDate: "2024-11-25T13:10:14.824+09:00",
                },
                {
                  id: 6,
                  email: "babomin3942@naver.com",
                  nickname: "사팔구",
                  gender: null,
                  profileImage:
                    "https://cdn.linkedoutapp.com/service/profile_icon_01.png",
                  birthDate: null,
                  platform: "kakao",
                  platformId: "3706697291",
                  status: "activated",
                  reputation: 0,
                  subscriptionEnd: null,
                  createdDate: "2024-11-21T23:34:23.284+09:00",
                  updatedDate: "2024-11-21T23:34:32.586+09:00",
                  deactivationDate: null,
                  deletedDate: null,
                },
                {
                  id: 5,
                  email: "leejy8506@naver.com",
                  nickname: "공공구",
                  gender: null,
                  profileImage:
                    "https://cdn.linkedoutapp.com/service/profile_icon_01.png",
                  birthDate: null,
                  platform: "naver",
                  platformId: "00r1Ho0A633EejOtOttoobQhWo38iTXc-bG8J9kAJtA",
                  status: "activated",
                  reputation: 0,
                  subscriptionEnd: null,
                  createdDate: "2024-11-19T22:39:45.513+09:00",
                  updatedDate: "2024-11-19T22:39:55.560+09:00",
                  deactivationDate: null,
                  deletedDate: null,
                },
                {
                  id: 4,
                  email: "kkhyungyung0@naver.com",
                  nickname: "공일사",
                  gender: null,
                  profileImage:
                    "https://cdn.linkedoutapp.com/service/profile_icon_01.png",
                  birthDate: null,
                  platform: "naver",
                  platformId: "tBIxKJ0_Kg_r14IXbGtm5HfUD0d0blmzeVZQK_MnLiA",
                  status: "activated",
                  reputation: 1,
                  subscriptionEnd: null,
                  createdDate: "2024-11-05T22:57:26.982+09:00",
                  updatedDate: "2024-12-05T01:09:00.292+09:00",
                  deactivationDate: null,
                  deletedDate: null,
                },
                {
                  id: 3,
                  email: "1004yhrpt@naver.com",
                  nickname: "오구구",
                  gender: null,
                  profileImage:
                    "https://cdn.linkedoutapp.com/service/profile_icon_01.png",
                  birthDate: null,
                  platform: "kakao",
                  platformId: "3650602005",
                  status: "activated",
                  reputation: 0,
                  subscriptionEnd: null,
                  createdDate: "2024-11-04T19:14:18.104+09:00",
                  updatedDate: "2024-11-04T19:14:45.406+09:00",
                  deactivationDate: null,
                  deletedDate: null,
                },
                {
                  id: 2,
                  email: "kitoram@naver.com",
                  nickname: "이팔일",
                  gender: null,
                  profileImage:
                    "https://cdn.linkedoutapp.com/service/profile_icon_01.png",
                  birthDate: null,
                  platform: "kakao",
                  platformId: "3777735277",
                  status: "activated",
                  reputation: 17,
                  subscriptionEnd: null,
                  createdDate: "2024-11-04T10:52:07.066+09:00",
                  updatedDate: "2024-12-05T01:09:00.292+09:00",
                  deactivationDate: null,
                  deletedDate: null,
                },
                {
                  id: 1,
                  email: "dudgk0216@gmail.com",
                  nickname: "리액트",
                  gender: null,
                  profileImage:
                    "https://cdn.linkedoutapp.com/profile/eeb8b309-4138-4be9-829a-cde10e8cc5e9",
                  birthDate: null,
                  platform: "google",
                  platformId: "114938737969974601044",
                  status: "activated",
                  reputation: 140,
                  subscriptionEnd: null,
                  createdDate: "2024-11-01T10:43:27.576+09:00",
                  updatedDate: "2024-12-05T01:09:00.292+09:00",
                  deactivationDate: null,
                  deletedDate: null,
                },
              ],
              totalPage: 1,
              page: 1,
              total: 8,
            },
          }),
        })
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
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("accessToken", "token");
    });
    await page.goto("http://localhost:5173/users/1");

    await page.route(
      "https://linkedoutapp.com/api/admin-management/users/1",
      (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              id: 1,
              nickname: "리액트",
              email: "dudgk0216@gmail.com",
              gender: null,
              profileImage:
                "https://cdn.linkedoutapp.com/profile/eeb8b309-4138-4be9-829a-cde10e8cc5e9",
              birthDate: null,
              platform: "google",
              platformId: "114938737969974601044",
              status: "activated",
              subscriptionEnd: null,
              createdDate: "2024-11-01T10:43:27.576+09:00",
              updatedDate: "2024-12-05T01:12:00.262+09:00",
              deletedDate: null,
              reputation: 140,
              reportCount: 0,
              reviewCount: 0,
              essayCount: 40,
              alertSettings: [
                {
                  viewed: true,
                  report: true,
                  marketing: true,
                },
              ],
            },
          }),
        })
    );
  });
  test("에세이 디테일 페이지를 보여준다.", async ({ page }) => {
    await page.goto("http://localhost:5173/users/1");

    await expect(page.getByText("사용자 ID")).toBeVisible();
    await expect(page.getByText("사용자 이메일")).toBeVisible();
    await expect(page.getByText("계정상태")).toBeVisible();
  });
});

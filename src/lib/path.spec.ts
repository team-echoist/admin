import { createPath, getParamsFromPath } from "./path.utils";

describe("createPath 함수", () => {
  it("정상적인 경로를 생성해야 한다", () => {
    const path = "essays/:id";
    const params = { id: 123 };
    const result = createPath(path, params);
    expect(result).toBe("/essays/123");
  });
  it("경로가 이미 / 로 시작하면 /를 추가하지 않는다", () => {
    const path = "/users/:id";
    const params = { id: 123 };
    const result = createPath(path, params);
    expect(result).toBe("/users/123");
  });
  it("파라미터가 없으면 오류를 발생시킨다", () => {
    const path = "essays/:id";
    const params = {};
    expect(() => createPath(path, params)).toThrow("id 에러 발생");
  });
});

describe("getParamsFromPath 함수", () => {
  it("정상적인 경로에서 파라미터를 추출해야 한다", () => {
    const path = "users/:id"; // DefaultPaths.User.Detail
    const url = "/users/123"; // useLocation().pathname
    const result = getParamsFromPath(path, url);
    expect(result).toEqual({ id: "123" });
  });

  it("여러 동적 파라미터를 추출해야 한다", () => {
    const path = "posts/:type/:date";
    const url = "/posts/essay/2024-12-15";
    const result = getParamsFromPath(path, url);
    expect(result).toEqual({ type: "essay", date: "2024-12-15" });
  });

  it("경로가 일치하지 않으면 오류를 발생시킨다", () => {
    const path = "users/:id";
    const url = "/products/123";
    expect(() => getParamsFromPath(path, url)).toThrow(
      "경로가 일치하지 않습니다."
    );
  });
});

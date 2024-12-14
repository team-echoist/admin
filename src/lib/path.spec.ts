import { createPath } from "./path.utils";

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

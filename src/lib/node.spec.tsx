import { hasValidChildren } from "./node.utils";

test("return true for valid children case", () => {
  const children = [<div key="1">Valid</div>, "Text"];
  expect(hasValidChildren(children)).toBe(true);
});

test("return false for invalid or empty children case", () => {
  const children = [null, undefined, false];
  expect(hasValidChildren(children)).toBe(false);
});

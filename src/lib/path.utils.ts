export type PathParams = string | number | { [key: string]: string | number };

export const createPath = (
  path: string,
  params: { [key: string]: PathParams } = {}
): string => {
  let result = path.startsWith("/") ? "" : "/";

  result += path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    if (key in params) {
      return params[key].toString();
    }
    throw new Error(`${key} 에러 발생`);
  });

  return result;
};

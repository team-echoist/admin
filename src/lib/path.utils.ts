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

export const getParamsFromPath = (
  path: string,
  url: string
): Record<string, string | number> => {
  const pathSegments = path.split("/");
  const urlSegments = url.split("/");

  if (pathSegments.length !== urlSegments.length) {
    throw new Error("경로 길이가 일치하지 않습니다.");
  }

  const params: Record<string, string | number> = {};

  pathSegments.forEach((segment, index) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1);
      params[paramName] = urlSegments[index];
    } else if (segment !== urlSegments[index]) {
      throw new Error("경로가 일치하지 않습니다.");
    }
  });

  return params;
};

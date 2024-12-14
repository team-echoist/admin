export type Paths<T extends string = string> = {
  [key: string]: T | { [subKey: string]: T };
};

export const AuthPaths: Paths = {
  LOGIN: "login",
  REGISTER: "register",
};

export const DefaultPaths: Paths = {
  DASHBOARD: "dashboard",
  ESSAY: { LIST: "essays", DETAIL: "essays/:id" },
  NOTICE: { LIST: "notices", DETAIL: "notices/:id" },
  USER: { LIST: "users", DETAIL: "users/:id" },
  REPORT: { LIST: "reports" },
  RELEASE: { LIST: "releases", DETAIL: "releases/:id" },
  QUERY: { LIST: "queries", DETAIL: "queries/:id" },
  ITEM: { LIST: "items", DETAIL: "items/:id" },
  MANAGER: {
    LIST: "managers",
    DETAIL: "managers/:id",
    HISTORY: "manager-history",
  },
  GEULROQUIS: { LIST: "geulroquis", DETAIL: "geulroquis/:id" },
  THEME: { LIST: "themes" },
  VERSION: "version",
  MY: "my-page",
  MONITORING: "monitoring",
};

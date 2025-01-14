export interface Pagination {
  page: number;
  perPage: number;
}

export interface ListParams {
  pagination: Pagination;
  filter?: FilterParams;
}

export interface DetailParams {
  id?: number;
  filter?: FilterParams;
}
export interface FilterParams {
  keyword?: string;
  status?: string;
}

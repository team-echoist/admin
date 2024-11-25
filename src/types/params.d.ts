export interface Pagination {
  page: number;
  perPage: number;
}

export interface ListParams {
  pagination: Pagination;
  filter?: string;
}

export interface DetailParams {
  id?: number;
  filter?: string;
}

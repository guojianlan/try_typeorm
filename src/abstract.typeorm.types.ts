export interface PaginationResult<T> {
  data: T;
  pagination: {
    page: number;
    pageSize: number;
    count: number;
  };
}

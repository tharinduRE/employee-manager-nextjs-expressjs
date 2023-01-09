export interface Pagination<T> {
  data: T[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
  };
}
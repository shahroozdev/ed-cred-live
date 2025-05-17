export interface GetCategoryFilter {
  page?: number;
  pageSize?: number;
  name?: string;
  from?: string; // ISO date string
  to?: string;   // ISO date string
}
import { Employee } from "./employee";

export interface ApiFilter {
  order?:  'asc' | 'desc';
  orderBy?: keyof Employee;
  pagination: {
    page: number;
    pageSize: number;
  };
  filters?: {
    [s: string]: any;
  };
};

import { Employee } from "../interfaces/employee";

export type Order = 'asc' | 'desc';
export interface EmployeeStore {
  employeeList: Employee[];
  selectedEmployee: Employee | undefined;
  orderBy: keyof Employee
  order: Order
}

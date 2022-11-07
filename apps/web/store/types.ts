import { Employee } from "../interfaces/employee";

export interface EmployeeStore {
  employeeList: Employee[];
  selectedEmployee: Employee | undefined;
}

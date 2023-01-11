/* eslint-disable turbo/no-undeclared-env-vars */
import Axios from "axios";
import { Employee } from "../interfaces/employee";
import { PaginatedResults } from "../interfaces/pagination";
import { Order } from "../store/types";

Axios.defaults.baseURL =  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';
Axios.defaults.withCredentials = true;

type ApiFilter = {
  order?: Order, 
  orderBy?: keyof Employee
  pagination:{
    limit: number,
    offset: number
  }
  filters? : {
    [s:string] : any
  }
}

const employeeRoute = `/employees`;
export const getEmployeeList = (apiFilter:ApiFilter) =>
  Axios.get<PaginatedResults<Employee>>(employeeRoute, { params: { order: apiFilter.order,orderBy: apiFilter.orderBy,...apiFilter.pagination, filters : JSON.stringify(apiFilter.filters)} });

export const addOne = (emp:Employee) => Axios.post<Employee>(employeeRoute,emp)

export const updateOne = (emp:Employee) => Axios.put<Employee>(`${employeeRoute}/${emp._id}`,emp)
export const getEmployeeById = (empId?:string) => Axios.get<Employee>(`${employeeRoute}/${empId}`)
export const deleteOne = (empId?:string) => Axios.delete(`${employeeRoute}/${empId}`)


/* eslint-disable turbo/no-undeclared-env-vars */
import { Employee } from "../interfaces/employee";
import Axios from "axios";
import { Order } from "../store/types";

Axios.defaults.baseURL =  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';
Axios.defaults.withCredentials = true;

const employeeRoute = `/employees`;
export const getEmployeeList = (order?: Order, orderBy?: keyof Employee) =>
  Axios.get<Employee[]>(employeeRoute, { params: { order, orderBy } });

export const addOne = (emp:Employee) => Axios.post<Employee>(employeeRoute,emp)

export const updateOne = (emp:Employee) => Axios.put<Employee>(`${employeeRoute}/${emp._id}`,emp)
export const getEmployeeById = (empId?:string) => Axios.get<Employee>(`${employeeRoute}/${empId}`)
export const deleteOne = (empId?:string) => Axios.delete(`${employeeRoute}/${empId}`)


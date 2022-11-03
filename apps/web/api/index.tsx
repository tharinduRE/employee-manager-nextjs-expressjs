/* eslint-disable turbo/no-undeclared-env-vars */
import { Employee } from "../interfaces/employee";
import Axios from "axios";

Axios.defaults.baseURL =  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';
Axios.defaults.withCredentials = true;

export const getEmployeeList = () => Axios.get<Employee[]>(`/employee`)
export const addOne = (emp:Employee) => Axios.post<Employee>(`/employee`,emp)

export const updateOne = (emp:Employee) => Axios.put<Employee>(`/employee/${emp._id}`,emp)
export const getEmployeeById = (empId:string | any) => Axios.get<Employee>(`/employee/${empId}`)
export const deleteOne = (empId:string) => Axios.delete(`/employee/${empId}`)


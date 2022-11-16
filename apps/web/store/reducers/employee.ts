import { createReducer } from "@reduxjs/toolkit";
import { EmployeeStore, Order } from "../types";

import { createAction } from "@reduxjs/toolkit";
import { Employee } from "./../../interfaces/employee";

export const EMPLOYEE_SELECTED = createAction<Employee>("EMPLOYEE_SELECTED");
export const EMPLOYEE_DELETED = createAction<string | undefined>("EMPLOYEE_DELETED");
export const EMPLOYEE_ORDER = createAction<{order:Order,orderBy:keyof Employee}>("EMPLOYEE_ORDER");

const initialState : EmployeeStore = {
  employeeList: [],
  selectedEmployee: undefined,
  order: 'asc',
  orderBy: 'first_name'
};

const empReducer = createReducer<EmployeeStore>(initialState, (builder) => {
  builder
    .addCase(EMPLOYEE_SELECTED, (state, action) => ({
      ...state,
      selectedEmployee: action.payload,
    }))
    .addCase(EMPLOYEE_DELETED, (state, action) => ({
      ...state,
      employeeList: state.employeeList.filter(
        (employee) => employee._id !== action.payload
      ),
    }))
    .addCase(EMPLOYEE_ORDER,(state,action)=> ({
      ...state,
      ...action.payload,
    }))
    .addDefaultCase((state) => {
      return state
    });
});

export default empReducer;

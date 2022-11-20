import { createReducer } from "@reduxjs/toolkit";
import { EmployeeStore, Order } from "../types";

import { createAction } from "@reduxjs/toolkit";
import { Employee } from "./../../interfaces/employee";

export const EMPLOYEE_ORDER = createAction<{order:Order,orderBy:keyof Employee}>("EMPLOYEE_ORDER");
export const EMPLOYEE_SELECTED = createAction<Employee>("EMPLOYEE_SELECTED");

const initialState : EmployeeStore = {
  // employeeList: [],
  selectedEmployee: undefined,
  order: 'asc',
  orderBy: 'first_name'
};

const empReducer = createReducer<EmployeeStore>(initialState, (builder) => {
  builder
    .addCase(EMPLOYEE_ORDER,(state,action)=> ({
      ...state,
      ...action.payload,
    }))
    .addCase(EMPLOYEE_SELECTED, (state, action) => ({
      ...state,
      selectedEmployee: action.payload,
    }))
    .addDefaultCase((state) => state);
});

export default empReducer;

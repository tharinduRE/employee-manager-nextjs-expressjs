import { createReducer } from "@reduxjs/toolkit";
import { EmployeeStore } from "../types";

import { createAction } from "@reduxjs/toolkit";
import { Employee } from "./../../interfaces/employee";

export const EMPLOYEE_SELECTED = createAction<Employee>("EMPLOYEE_SELECTED");
export const EMPLOYEE_DELETED = createAction<string | undefined>("EMPLOYEE_DELETED");

const initialState = {
  employeeList: [],
  selectedEmployee: undefined,
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
    .addDefaultCase((state) => {
      return state
    });
});

export default empReducer;

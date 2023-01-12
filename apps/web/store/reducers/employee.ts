import { createReducer } from "@reduxjs/toolkit";
import { EmployeeStore, Order } from "../types";

import { createAction } from "@reduxjs/toolkit";
import { Employee } from "./../../interfaces/employee";

export const EMPLOYEE_ORDER = createAction<{order:Order,orderBy:keyof Employee}>("EMPLOYEE_ORDER");
export const EMPLOYEE_SELECTED = createAction<Employee>("EMPLOYEE_SELECTED");
export const EMPLOYEE_FILTER = createAction<{value:any,field:keyof Employee}>("EMPLOYEE_FILTER");
export const EMPLOYEE_PAGINATION = createAction<{
  page: number,
  pageSize: number
}>("EMPLOYEE_PAGINATION");


const initialState : EmployeeStore = {
  // employeeList: [],
  selectedEmployee: undefined,
  order: 'asc',
  orderBy: 'first_name',
  filters: {},
  pagination: {
    pageSize:10,
    page:0 
  },
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
    .addCase(EMPLOYEE_FILTER,(state,action)=> {
      if (action.payload.value == "") {
        delete state.filters[action.payload.field];
      } else {
        state.filters = {
          ...state.filters,
          ...{ [action.payload.field]: action.payload.value },
        }
      }
      state.pagination = initialState.pagination;
    })
    .addCase(EMPLOYEE_PAGINATION, (state, action) => {
     state.pagination = {
       page : action.payload.page,
       pageSize: action.payload.pageSize || state.pagination.pageSize,
    };

    })
    .addDefaultCase((state) => state);
});

export default empReducer;

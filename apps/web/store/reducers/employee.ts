import { Employee } from "./../../interfaces/employee";

const initialState: {
  employeeList: Employee[];
  selectedEmployee: Employee | undefined;
} = {
  employeeList: [],
  selectedEmployee: undefined,
};

const empReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case "EMPLOYEE_DELETE_SUCCEEDED":
      const newEmployeeList = state.employeeList.filter(
        (employee) => employee._id !== action.payload
      );
      return {
        ...state,
        employeeList: newEmployeeList,
      };
    case "EMPLOYEE_SELECTED":
      const selectedEmployee = action.payload
      return {
        ...state,
        selectedEmployee,
      };
    default:
      return state;
  }
};

export default empReducer;

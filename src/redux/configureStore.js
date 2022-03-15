import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import { Departments } from "./departments";
import { Role } from "./role";
import { Staffs } from "./staffs";
import { StaffsSalary } from "./staffsSalary";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { AddStaffForm } from "./form";


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      role: Role,
      staffsSalary: StaffsSalary,
      ...createForms({
        addStaff: AddStaffForm
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};

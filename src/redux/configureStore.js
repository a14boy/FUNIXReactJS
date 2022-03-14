import { createStore, combineReducers, applyMiddleware } from "redux";
import { Departments } from "./departments";
import { Role } from "./role";
import { Staffs } from "./staffs";
import { StaffsSalary } from "./staffsSalary";
import thunk from "redux-thunk";
import logger from "redux-logger";


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      role: Role,
      staffsSalary: StaffsSalary
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};

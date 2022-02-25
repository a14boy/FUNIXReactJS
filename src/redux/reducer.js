import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/departments";
import { ROLE } from "../shared/role";

export const initialState = {
  staffs: STAFFS,
  role: ROLE,
  departments: DEPARTMENTS,
};

export const Reducer = (state = initialState, action) => {
  return state;
};

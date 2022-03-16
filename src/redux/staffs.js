import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = {
    isLoading: true,
    errMess: null,
    staffs: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.STAFFS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        staffs: [],
      };
    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        staffs: action.payload,
      };
    case ActionTypes.ADD_STAFF:
      var newStaff = action.payload;
      return {
        ...state,
        isloading: false,
        staffs: state.staffs.concat(newStaff),
      };
    default:
      return state;
  }
};

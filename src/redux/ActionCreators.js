import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addStaff = (newStaff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: newStaff,
});

export const postStaff = (newStaff) => (dispatch) => {
  dispatch(staffsLoading(true));
  dispatch(addStaff(newStaff));
  return fetch(baseUrl + "staffs", {
    method: "POST",
    body: JSON.stringify(newStaff),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addStaffs(response)))
    .then((response) => dispatch(fetchStaffsSalary(response)))
    .then((response) => dispatch(fetchDepartments(response)))
    .catch((error) => {
      console.log("post staffs", error.message);
      alert("Your staff could not be posted\nError: " + error.message);
    });
};

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};
export const addDepartments = (staffs) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: staffs,
});
export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const fetchStaffsSalary = () => (dispatch) => {
  dispatch(staffsSalaryLoading(true));
  fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffsSalary) => dispatch(addStaffsSalary(staffsSalary)))
    .catch((error) => dispatch(staffsSalaryFailed(error.message)));
};
export const addStaffsSalary = (staffsSalary) => ({
  type: ActionTypes.ADD_STAFFS_SALARY,
  payload: staffsSalary,
});
export const staffsSalaryLoading = () => ({
  type: ActionTypes.STAFFS_SALARY_LOADING,
});

export const staffsSalaryFailed = (errmess) => ({
  type: ActionTypes.STAFFS_SALARY_FAILED,
  payload: errmess,
});

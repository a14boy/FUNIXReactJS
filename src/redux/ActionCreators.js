import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addStaff = (newStaff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: newStaff,
});

export const postStaff = (staff) => (dispatch) => {
  const newStaff = {
    id: STAFFS.length,
    name: staff.name,
    doB: staff.doB,
    salaryScale: staff.salaryScale,
    startDate: staff.startDate,
    department: staff.department,
    annualLeave: staff.annualLeave,
    overTime: staff.overTime,
    image: "/assets/images/alberto.png",
  };
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
    .then((response) => dispatch(addStaff(response)))
    .catch((error) => {
      console.log("post staffs", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const fetchStaff = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)));
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

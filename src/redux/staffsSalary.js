import * as ActionTypes  from "./ActionTypes"

export const StaffsSalary = (state = {
    isLoading: true,
    errMess: null,
    staffsSalary:[]
}, action) =>
{switch(action.type){
    case(ActionTypes.STAFFS_SALARY_LOADING):
        return({
            ...state,
            isLoading: true,
            errMess: null,
            staffsSalary:[]
});
    case(ActionTypes.STAFFS_SALARY_FAILED):
        return({
            ...state,
            isLoading: false,
            errMess: action.payload,
});
    case(ActionTypes.ADD_STAFFS_SALARY):
        return({
            ...state,
            isLoading: false,
            staffsSalary:action.payload
})
    default:
        return state;
}}
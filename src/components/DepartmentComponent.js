import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import { Loading } from "./LoadingComponent";

function RenderDepartment({ department }) {
  return (
    <Card className="pl-3">
      <CardTitle>{department.name}</CardTitle>
      <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
    </Card>
  );
}
const Departments = (props) => {
  if (props.departments.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.departments.errMess) {
    return <h4>{props.departments.errMess}</h4>;
  } else {
    const departmentDetail = props.departments.departments.map((department) => {
      return (
        <div key={department.id} className="col-12 col-md-6 col-lg-4 mb-3">
          <RenderDepartment department={department} />
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Phòng ban</h3>
            <hr />
          </div>
        </div>
        <div className="row">{departmentDetail}</div>
      </div>
    );
  }
};
export default Departments;

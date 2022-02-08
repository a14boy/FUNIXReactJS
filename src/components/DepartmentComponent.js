import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";

function RenderDepartment({ department }) {
  return (
    <Card className="pl-3">
      <CardTitle>{department.name}</CardTitle>
      <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
    </Card>
  );
}
const Departments = (props) => {
  const departmentDetail = props.departments.map((department) => {
    return (
      <div key={department.id} className="col-12 col-md-6 col-lg-4 mb-3">
        <RenderDepartment department={department} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="col-12">
        <h3>Phòng ban</h3>
        <hr />
      </div>
      <div className="row">{departmentDetail}</div>
    </div>
  );
};

export default Departments;

import React from "react";
import { Card, CardTitle, CardText, CardBody, CardFooter } from "reactstrap";

function RenderPayroll({ staff }) {
  const basicSalary = 3000000;
  const overTimeSalary = 2000000;
  const constSalary =
    staff.salaryScale * basicSalary + staff.overTime * overTimeSalary;
  return (
    <Card>
      <CardBody className="pl-3">
        <CardTitle>{staff.name}</CardTitle>
        <CardText>Mã nhân viên: {staff.numberOfStaff}</CardText>
        <CardText>Hệ số lương: {staff.salaryScale}</CardText>
        <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
      </CardBody>
      <CardFooter>Lương: {constSalary}</CardFooter>
    </Card>
  );
}

const Payrolls = (props) => {
  const payroll = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-md-6 col-lg-4 mb-3">
        <RenderPayroll staff={staff} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Nhân viên</h3>
          <hr />
        </div>
      </div>
      <div className="row">{payroll}</div>
    </div>
  );
};

export default Payrolls;

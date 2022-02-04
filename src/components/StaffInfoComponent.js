import React from "react";
import {
  Card,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

function RenderStaff({ staff }) {
  if (staff != null)
    return (
      <div id="selectedDish" className="col-sm-12 col-md-6 col-lg-4">
        <img top src={staff.image} alt={staff.name} />
      </div>
    );
  else return <div></div>;
}

function RenderStaffInfo({ staff }) {
  if (staff != null)
    return (
      <div className="col-xs-12 col-sm-6 col-lg-8">
        <Card id="viewStaffInfo">
          <CardTitle>{staff.name}</CardTitle>
          <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
          <CardText>
            Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
          </CardText>
          <CardText>Phòng ban: {staff.department.name}</CardText>
          <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
          <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
        </Card>
      </div>
    );
  else return <div></div>;
}

const StaffInfo = (props) => {
  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffList">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <RenderStaff dish={props.staff} />
          <RenderStaffInfo staff={props.staff} />
        </div>
      </div>
    );
  else return <div></div>;
};

export default StaffInfo;

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

function RenderStaffInfo({ staff }) {
  if (staff != null)
    return (
      <React.Fragment>
        <div id="selectedDish" className="col-12 col-sm-6 col-lg-4">
          <img top src={staff.image} alt={staff.name} width="100%" />
        </div>
        <div className="col-12 col-sm-6 col-lg-8">
          <Card id="viewStaffInfo" className="p-3">
            <CardTitle>{staff.name}</CardTitle>
            <CardText>
              Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
            </CardText>
            <CardText>
              Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
            </CardText>
            <CardText>Phòng ban: {staff.department.name}</CardText>
            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
          </Card>
        </div>
      </React.Fragment>
    );
  else return <div></div>;
}

const StaffInfo = (props) => {
  if (props.staff != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/stafflist">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row pb-3">
          <RenderStaffInfo staff={props.staff} />
        </div>
      </div>
    );
  else return <div></div>;
};

export default StaffInfo;

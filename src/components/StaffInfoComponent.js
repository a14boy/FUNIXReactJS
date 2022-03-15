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
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

function RenderStaffInfo({ staff, department }) {
  if (department.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (department.errMess) {
    return <h4>{department.errMess}</h4>;
  } else if (department.departments != null) {
    const dept = department.departments.filter(
      (department) => department.id === staff.departmentId
    )[0];
    return (
      <React.Fragment>
        <div id="selectedDish" className="col-12 col-sm-6 col-lg-4">
          <FadeTransform
            in
            transformProps={{
              exitTransform: "scale(0.5) translateX(-50%)",
            }}
          >
            <img top src={staff.image} alt={staff.name} width="100%" />
          </FadeTransform>
        </div>
        <div className="col-12 col-sm-6 col-lg-8">
          <FadeTransform
            in
            transformProps={{
              exitTransform: "scale(0.5) translateX(50%)",
            }}
          >
            <Card id="viewStaffInfo" className="p-3">
              <CardTitle>{staff.name}</CardTitle>
              <CardText>
                Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>Phòng ban: {dept.name}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
            </Card>
          </FadeTransform>
        </div>
      </React.Fragment>
    );
  }
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
          <RenderStaffInfo staff={props.staff} department={props.department} />
        </div>
      </div>
    );
  else return <div></div>;
};

export default StaffInfo;

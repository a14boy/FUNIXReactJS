import React from "react";
import {
  Card,
  CardImg,
  BreadcrumbItem,
  Breadcrumb,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

function StaffInDept({ department, staffs }) {
  if (staffs.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (staffs.errMess) {
    return <h4>{staffs.errMess}</h4>;
  } else if (staffs.staffs != null) {
    const Deptdetail = staffs.staffs
      .filter((staff) => staff.departmentId === department.id)
      .map((staff) => (
        <div key={staff.id} className="col-12 col-md-6 col-lg-3 mb-3">
          <Link to={`/stafflist/${staff.id}`}>
            <FadeTransform
              in
              transformProps={{
                exitTransform: "scale(0.5) translateY(-50%)",
              }}
            >
              <Card>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle className="text-center">{staff.name}</CardTitle>
              </Card>
            </FadeTransform>
          </Link>
        </div>
      ));
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/department">Phòng ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{department.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">{Deptdetail}</div>
      </div>
    );
  }
}
export default StaffInDept;

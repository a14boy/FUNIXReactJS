import React from "react";
import { Card, CardImg, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const StaffList = (props) => {
  const staffList = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-6 col-md-4 col-lg-2">
        <Link to={`/StaffList/${staff.id}`}>
          <Card>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardTitle className="text-center">{staff.name}</CardTitle>
          </Card>
        </Link>
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
      <div className="row">{staffList}</div>
    </div>
  );
};

export default StaffList;

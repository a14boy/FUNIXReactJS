import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, CardFooter } from "reactstrap";
import SortComponent from "./SortComponent";

class Payrolls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSort: "Tăng",
    };

    this.handleSort = this.handleSort.bind(this);
    this.staffSalary = this.staffSalary.bind(this);
    this.mySort = this.mySort.bind(this);
  }

  handleSort = (sortType) => {
    this.setState({ currentSort: sortType });
  };
  staffSalary = (staff) => {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;
    return parseInt(
      staff.salaryScale * basicSalary + staff.overTime * overTimeSalary,
      10
    );
  };
  mySort = (staff1, staff2) =>
    this.state.currentSort === "Tăng"
      ? this.staffSalary(staff1) - this.staffSalary(staff2)
      : this.staffSalary(staff2) - this.staffSalary(staff1);
  render() {
    const payroll = this.props.staffs
      .sort((staff1, staff2) => this.mySort(staff1, staff2))
      .map((staff) => {
        return (
          <div key={staff.id} className="col-12 col-md-6 col-lg-4 mb-3">
            <Card>
              <CardBody className="pl-3">
                <CardTitle>{staff.name}</CardTitle>
                <CardText>
                  Mã nhân viên: {staff.department.numberOfStaff}
                </CardText>
                <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
              </CardBody>
              <CardFooter>Lương: {this.staffSalary(staff)}</CardFooter>
            </Card>
          </div>
        );
      });
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <h3>Bảng lương</h3>
          </div>
          <div className="col-12 col-sm-6">
            <SortComponent onSubmit={this.handleSort} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="row">{payroll}</div>
      </div>
    );
  }
}

export default Payrolls;

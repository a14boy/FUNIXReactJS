import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, CardFooter } from "reactstrap";
import SortComponent from "./SortComponent";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

class Payrolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: "Tăng",
    };

    this.handleSort = this.handleSort.bind(this);
    this.mySort = this.mySort.bind(this);
  }

  handleSort = (sortType) => {
    this.setState({ currentSort: sortType });
  };
  mySort = (staff1, staff2) =>
    this.state.currentSort === "Tăng"
      ? staff1.salary - staff2.salary
      : staff2.salary - staff1.salary;
  render() {
    if (this.props.staffsSalary.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffsSalary.errMess) {
      return <h4>{this.props.staffsSalary.errMess}</h4>;
    } else {
      const payroll = this.props.staffsSalary.staffsSalary
        .sort((staff1, staff2) => this.mySort(staff1, staff2))
        .map((staff) => {
          return (
            <div key={staff.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <FadeTransform
                in
                transformProps={{
                  exitTransform: "scale(0.5) translateY(-50%)",
                }}
              >
                <Card>
                  <CardBody className="pl-3">
                    <CardTitle>{staff.name}</CardTitle>
                    <CardText>Mã nhân viên: {staff.id}</CardText>
                    <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
                  </CardBody>
                  <CardFooter>Lương: {staff.salary}</CardFooter>
                </Card>
              </FadeTransform>
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
}

export default Payrolls;

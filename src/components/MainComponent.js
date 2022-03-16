import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffInfo from "./StaffInfoComponent";
import Departments from "./DepartmentComponent";
import Payrolls from "./PayrollComponent";
import StaffInDept from "./DepartmentDetail";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDepartments,
  fetchStaffsSalary,
  addStaff,
  postStaff,
} from "../redux/ActionCreators";
import { Loading } from "./LoadingComponent";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    role: state.role,
    departments: state.departments,
    staffsSalary: state.staffsSalary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  addStaff: (newStaff) => {
    dispatch(addStaff(newStaff));
  },
  postStaff: (newStaff) => {
    dispatch(postStaff(newStaff));
  },
  resetAddStaffForm: () => {
    dispatch(actions.reset("addStaff"));
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchStaffsSalary: () => {
    dispatch(fetchStaffsSalary());
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
    this.props.addStaff();
    this.props.postStaff();
  }
  render() {
    const HomePage = () => {
      return (
        <StaffList
          staffs={this.props.staffs}
          addStaff={this.props.addStaff}
          postStaff={this.props.postStaff}
        />
      );
    };

    const StaffWithId = ({ match }) => {
      if (this.props.staffs.isLoading) {
        return (
          <div className="container">
            <div className="row">
              <Loading />
            </div>
          </div>
        );
      } else if (this.props.staffs.errMess) {
        return <h4>{this.props.staffs.errMess}</h4>;
      } else if (this.props.staffs.staffs != null) {
        return (
          <StaffInfo
            staff={
              this.props.staffs.staffs.filter(
                (staff) => staff.id === parseInt(match.params.id, 10)
              )[0]
            }
            department={this.props.departments}
          />
        );
      }
    };

    const DeptWithId = ({ match }) => {
      if (this.props.departments.isLoading) {
        return (
          <div className="container">
            <div className="row">
              <Loading />
            </div>
          </div>
        );
      } else if (this.props.departments.errMess) {
        return <h4>{this.props.departments.errMess}</h4>;
      } else if (this.props.departments.departments != null) {
        return (
          <StaffInDept
            department={
              this.props.departments.departments.filter(
                (dept) => dept.id === match.params.id
              )[0]
            }
            staffs={this.props.staffs}
          />
        );
      }
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/stafflist"
            component={() => (
              <HomePage resetAddStaffForm={this.props.resetAddStaffForm} />
            )}
          />
          <Route path="/stafflist/:id" component={StaffWithId} />
          <Route
            path="/payroll"
            component={() => (
              <Payrolls staffsSalary={this.props.staffsSalary} />
            )}
          />
          <Route
            exact
            path="/department"
            component={() => (
              <Departments departments={this.props.departments} />
            )}
          />
          <Route path="/department/:id" component={DeptWithId} />
          <Redirect to="/stafflist" component={HomePage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffInfo from "./StaffInfoComponent";
import Departments from "./DepartmentComponent";
import Payrolls from "./PayrollComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDepartments,
  fetchStaffsSalary,
} from "../redux/ActionCreator";

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
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchStaffsSalary: () => {
    dispatch(fetchStaffsSalary());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }
  render() {
    const HomePage = () => {
      return <StaffList staffs={this.props.staffs} />;
    };

    const StaffWithId = ({ match }) => {
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
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/stafflist" component={HomePage} />
          <Route path="/stafflist/:id" component={StaffWithId} />
          <Route
            path="/payroll"
            component={() => (
              <Payrolls staffsSalary={this.props.staffsSalary} />
            )}
          />
          <Route
            path="/department"
            component={() => (
              <Departments departments={this.props.departments} />
            )}
          />
          <Redirect to="/stafflist" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

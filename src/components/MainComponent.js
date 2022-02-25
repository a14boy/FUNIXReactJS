import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffInfo from "./StaffInfoComponent";
import Departments from "./DepartmentComponent";
import Payrolls from "./PayrollComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    role: state.role,
    departments: state.departments,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return <StaffList staffs={this.props.staffs} />;
    };

    const StaffWithId = ({ match }) => {
      return (
        <StaffInfo
          staff={
            this.props.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
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
            component={() => <Payrolls staffs={this.props.staffs} />}
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

export default withRouter(connect(mapStateToProps)(Main));

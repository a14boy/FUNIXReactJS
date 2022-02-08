import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffInfo from "./StaffInfoComponent";
import Departments from "./DepartmentComponent";
import Payrolls from "./PayrollComponent";
import { STAFFS } from "../shared/staffs";
import { ROLE } from "../shared/role";
import { DEPARTMENTS } from "../shared/departments";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      role: ROLE,
      departments: DEPARTMENTS,
    };
  }

  render() {
    const HomePage = () => {
      return <StaffList staffs={this.state.staffs} />;
    };

    const StaffWithId = ({ match }) => {
      return (
        <StaffInfo
          staff={
            this.state.staffs.filter(
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
            component={() => <Payrolls staffs={this.state.staffs} />}
          />
          <Route
            path="/department"
            component={() => (
              <Departments departments={this.state.departments} />
            )}
          />
          <Redirect to="/stafflist" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;

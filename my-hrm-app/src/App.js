import './App.css';
import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import StaffList from './components/StaffListComponent';
import { STAFFS } from './shared/staffs';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: STAFFS
    };
  }
  render() {
    return (
      <div className="App container-fluid">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Phần mềm quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffList dishes={this.state.dishes} />
      </div>
    );
  }
}


export default App;

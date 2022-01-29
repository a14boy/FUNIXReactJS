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
        <div className='col-12'>
          <Navbar dark color="primary" className="navbar-nav">
              <NavbarBrand href="/">
                <h3 className="nav-item">Phần mềm quản lý nhân sự v1.0</h3>
              </NavbarBrand>   
          </Navbar>
        </div>
        <StaffList dishes={this.state.dishes} />
      </div>
    );
  }
}


export default App;

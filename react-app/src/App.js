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
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <StaffList dishes={this.state.dishes} />
      </div>
    );
  }
}


export default App;

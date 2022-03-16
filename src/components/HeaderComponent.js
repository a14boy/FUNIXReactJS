import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
    };
    this.togglerNav = this.togglerNav.bind(this);
  }

  togglerNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <div className="mb-2">
        <React.Fragment>
          <Navbar dark expand="md">
            <div className="container">
              <NavbarToggler onClick={this.togglerNav} />
              <NavbarBrand className="mr-auto" href="/">
                <img
                  src="assets/images/logo.png"
                  height="30"
                  width="41"
                  alt="Ristorante Con Fusion"
                />
              </NavbarBrand>
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/Staff">
                      <span className="fa fa-users fa-lg"></span> Nhân viên
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/department">
                      <span className="fa fa-briefcase fa-lg"></span> Phòng ban
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/payroll">
                      <span className="fa fa-file-text  fa-lg"></span> Bảng
                      lương
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </div>
          </Navbar>
        </React.Fragment>
      </div>
    );
  }
}

export default Header;

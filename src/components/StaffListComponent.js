import React, { Component } from "react";
import { Card, CardImg, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBarComponent";

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: "",
    };
  }

  render() {
    const onSubmitSearch = (key) => {
      this.setState({ searchKey: key });
    };
    const staffList = this.props.staffs
      .filter((staff) =>
        staff.name.toLowerCase().includes(this.state.searchKey.toLowerCase())
      )
      .map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-md-4 col-lg-2 mb-3">
            <Link to={`/stafflist/${staff.id}`}>
              <Card>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardText className="text-center">{staff.name}</CardText>
              </Card>
            </Link>
          </div>
        );
      });

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <h3>Nhân viên</h3>
          </div>
          <div className="col-12 col-sm-6">
            <SearchBar onSubmit={onSubmitSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="row">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;

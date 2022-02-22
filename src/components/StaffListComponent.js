import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  Modal,
  Label,
  Row,
  Col,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBarComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: "",
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddStaffForm = this.handleAddStaffForm.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAddStaffForm(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
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
            <h3>
              Nhân viên{" "}
              <Button outline onClick={this.toggleModal}>
                <span className="fa fa-plus fa-lg"></span>
              </Button>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader
                  close={
                    <button className="close" onClick={this.toggleModal}>
                      ×
                    </button>
                  }
                  toggle={this.toggleModal}
                >
                  Thêm nhân viên
                </ModalHeader>
                <ModalBody>
                  <LocalForm
                    onSubmit={(values) => this.handleAddStaffForm(values)}
                  >
                    <Row className="form-group">
                      <Label htmlFor="name" md={4}>
                        Tên nhân viên
                      </Label>
                      <Col md={8}>
                        <Control.text
                          model=".name"
                          id="name"
                          name="name"
                          defaultValue="Nguyễn Văn A"
                          className="form-control"
                          validators={{
                            required,
                            minLength: minLength(3),
                            maxLength: maxLength(15),
                          }}
                        />
                        <Errors
                          model=".name"
                          className="text-danger"
                          show="touched"
                          messages={{
                            required: "Required ",
                            minLength: "Must be greater than 2 characters",
                            maxLength: "Must be 15 characters or less",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="doB" md={4}>
                        Ngày sinh
                      </Label>
                      <Col md={8}>
                        <Control.custom
                          model=".doB"
                          id="doB"
                          name="doB"
                          type="date"
                          className="form-control"
                        />
                        <Errors
                          model=".doB"
                          className="text-danger"
                          show="touched"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="salaryScale" md={4}>
                        Hệ số lương
                      </Label>
                      <Col md={8}>
                        <Control.text
                          model=".salaryScale"
                          id="salaryScale"
                          name="salaryScale"
                          defaultValue="1.0"
                          className="form-control"
                          validators={{
                            required,
                            isNumber,
                          }}
                        />
                        <Errors
                          model=".salaryScale"
                          className="text-danger"
                          show="touched"
                          messages={{
                            required: "Required ",
                            isNumber: "Must be a number",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="startDate" md={4}>
                        Ngày vào công ty
                      </Label>
                      <Col md={8}>
                        <Control.custom
                          model=".startDate"
                          id="startDate"
                          name="startDate"
                          type="date"
                          className="form-control"
                        />
                        <Errors
                          model=".startDate"
                          className="text-danger"
                          show="touched"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="department" md={4}>
                        Phòng ban
                      </Label>
                      <Col md={8}>
                        <Control.select
                          model=".department"
                          id="department"
                          name="department"
                        >
                          <option value="Finance">Finance</option>
                          <option value="Sale">Sale</option>
                          <option value="HR">HR</option>
                          <option value="Marketing">Marketing</option>
                          <option value="IT">IT</option>
                        </Control.select>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="annualLeave" md={4}>
                        Số ngày nghỉ còn lại
                      </Label>
                      <Col md={8}>
                        <Control.text
                          model=".annualLeave"
                          id="annualLeave"
                          name="annualLeave"
                          defaultValue="1"
                          className="form-control"
                          validators={{
                            required,
                            isNumber,
                          }}
                        />
                        <Errors
                          model=".annualLeave"
                          className="text-danger"
                          show="touched"
                          messages={{
                            required: "Required ",
                            isNumber: "Must be a number",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="overTime" md={4}>
                        Số ngày đã làm thêm
                      </Label>
                      <Col md={8}>
                        <Control.text
                          model=".overTime"
                          id="overTime"
                          name="overTime"
                          defaultValue="1"
                          className="form-control"
                          validators={{
                            required,
                            isNumber,
                          }}
                        />
                        <Errors
                          model=".overTime"
                          className="text-danger"
                          show="touched"
                          messages={{
                            required: "Required ",
                            isNumber: "Must be a number",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="salary" md={4}>
                        Lương
                      </Label>
                      <Col md={8}>
                        <Control.text
                          model=".salary"
                          id="salary"
                          name="salary"
                          defaultValue="3000000"
                          className="form-control"
                          validators={{
                            required,
                            isNumber,
                          }}
                        />
                        <Errors
                          model=".salary"
                          className="text-danger"
                          show="touched"
                          messages={{
                            required: "Required ",
                            isNumber: "Must be a number",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="image" md={4}>
                        Ảnh
                      </Label>
                      <Col md={8}>
                        <Control.file model=".image" id="image" name="image" />
                        <Errors
                          model=".image"
                          className="text-danger"
                          show="touched"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col sm={{ offset: 4, size: 8 }}>
                        <Button color="primary" type="submit">
                          Thêm vào danh sách
                        </Button>{" "}
                        <Button onClick={this.toggleModal}>Hủy bỏ</Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </ModalBody>
              </Modal>
            </h3>
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

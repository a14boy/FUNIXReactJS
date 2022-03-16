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
import { Form, Control, Errors, actions } from "react-redux-form";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBarComponent";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

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
      resetAddStaffForm: () => actions.reset("addStaff"),
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddStaffForm = this.handleAddStaffForm.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAddStaffForm(value) {
    const newStaff = {
      name: value.name,
      doB: value.doB,
      salaryScale: value.salaryScale,
      startDate: value.startDate,
      departmentId:
        value.department === "Sale"
          ? "Dept01"
          : value.department === "HR"
          ? "Dept02"
          : value.department === "Marketing"
          ? "Dept03"
          : value.department === "IT"
          ? "Dept04"
          : "Dept05",
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: "/assets/images/alberto.png",
    };
    this.props.postStaff(newStaff);
    this.state.resetAddStaffForm();
    this.toggleModal();
  }

  render() {
    const onSubmitSearch = (key) => {
      this.setState({ searchKey: key });
    };
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
    } else {
      const staffList = this.props.staffs.staffs
        .filter((staff) => staff.name)
        .filter((staff) =>
          staff.name.toLowerCase().includes(this.state.searchKey.toLowerCase())
        )
        .map((staff) => {
          return (
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 mb-3">
              <Link to={`/stafflist/${staff.id}`}>
                <FadeTransform
                  in
                  transformProps={{
                    exitTransform: "scale(0.5) translateY(-50%)",
                  }}
                >
                  <Card>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <CardText className="text-center">{staff.name}</CardText>
                  </Card>
                </FadeTransform>
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
                <Modal
                  isOpen={this.state.isModalOpen}
                  toggle={this.toggleModal}
                >
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
                    <Form
                      model="addStaff"
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
                            placeholder="Họ tên"
                            className="form-control"
                            validators={{
                              required,
                              minLength: minLength(4),
                              maxLength: maxLength(20),
                            }}
                          />
                          <Errors
                            model=".name"
                            className="text-danger"
                            show="touched"
                            messages={{
                              required: "Hãy Nhập vào tên nhân viên ",
                              minLength: "Tên phải có nhiều hơn 4 ký tự",
                              maxLength: "Tên phải có ít hơn 20 ký tự",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="doB" md={4}>
                          Ngày sinh
                        </Label>
                        <Col md={8}>
                          <Control
                            model=".doB"
                            id="doB"
                            name="doB"
                            type="date"
                            className="form-control"
                            validators={{ required }}
                          />
                          <Errors
                            model=".doB"
                            className="text-danger"
                            show="touched"
                            messages={{ required: "Hãy nhập vào ngày sinh" }}
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
                            defaultValue="1"
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
                              required: "Hãy nhập vào hệ số lương ",
                              isNumber: "Hệ số lương phải là một số",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="startDate" md={4}>
                          Ngày vào công ty
                        </Label>
                        <Col md={8}>
                          <Control
                            model=".startDate"
                            id="startDate"
                            name="startDate"
                            type="date"
                            className="form-control"
                            validators={{ required }}
                          />
                          <Errors
                            model=".startDate"
                            className="text-danger"
                            show="touched"
                            messages={{
                              required: "Hãy nhập ngày vào công ty",
                            }}
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
                            defaultValue="Finance"
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
                            defaultValue="0"
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
                              required: "Hãy nhập số ngày nghỉ thường niên ",
                              isNumber: "Số ngày nghỉ thường niên là một số",
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
                            defaultValue="0"
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
                              required: "Hãy nhập vào số ngày đã làm thêm ",
                              isNumber: "Số ngày làm thêm là một số",
                            }}
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
                    </Form>
                  </ModalBody>
                </Modal>
              </h3>
            </div>
            <div className="col-sm-12 col-md-6">
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
}

export default StaffList;

import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  Modal,
  Label,
  Col,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBarComponent";
import { DEPARTMENTS } from "../shared/departments";

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: "",
      isModalOpen: false,
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      department: "",
      annualLeave: "",
      overTime: "",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddStaffForm = this.handleAddStaffForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAddStaffForm(event) {
    event.preventDefault();
    let a;
    switch (this.state.department) {
      case "Sale":
        a = 0;
        break;
      case "HR":
        a = 1;
        break;
      case "Marketing":
        a = 2;
        break;
      case "IT":
        a = 3;
        break;
      default:
        a = 4;
    }
    DEPARTMENTS[a].numberOfStaff += 1;
    const newStaff = {
      id: this.props.staffs.length,
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: DEPARTMENTS[a],
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: "/assets/images/alberto.png",
    };
    if (
      newStaff.name &&
      newStaff.doB &&
      newStaff.salaryScale &&
      newStaff.startDate &&
      newStaff.department &&
      newStaff.annualLeave &&
      newStaff.overTime
    ) {
      this.props.staffs.push(newStaff);
      console.log(this.props.staffs);
      this.toggleModal();
    }
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  validate(
    name,
    doB,
    salaryScale,
    startDate,
    department,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      department: "",
      annualLeave: "",
      overTime: "",
    };
    if (this.state.touched.name && name.length < 4)
      errors.name = "Họ tên phải có trên 4 ký tự";
    else if (this.state.touched.name && name.length > 30)
      errors.name = "Họ tên phải có dưới 20 ký tự";

    if (this.state.touched.doB && !doB) errors.doB = "Hãy nhập vào ngày sinh";

    if (this.state.touched.salaryScale && (salaryScale <= 0 || !salaryScale))
      errors.salaryScale = "Hãy nhập lại hệ số lương";

    if (this.state.touched.startDate && !startDate)
      errors.startDate = "Hãy nhập vào ngày vào công ty";

    if (this.state.touched.annualLeave && (annualLeave < 0 || !annualLeave))
      errors.annualLeave = "Hãy nhập vào số ngày nghỉ";

    if (this.state.touched.overTime && (overTime < 0 || !overTime))
      errors.overTime = "Hãy nhập số ngày tăng ca";

    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.salaryScale,
      this.state.startDate,
      this.state.department,
      this.state.annualLeave,
      this.state.overTime
    );
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
                  <Form onSubmit={this.handleAddStaffForm}>
                    <FormGroup row>
                      <Label htmlFor="name" md={4}>
                        Tên nhân viên
                      </Label>
                      <Col md={8}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Họ tên"
                          value={this.state.name}
                          valid={errors.name === ""}
                          invalid={errors.name !== ""}
                          onBlur={this.handleBlur("name")}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="doB" md={4}>
                        Ngày sinh
                      </Label>
                      <Col md={8}>
                        <Input
                          type="date"
                          id="doB"
                          name="doB"
                          value={this.state.doB}
                          valid={errors.doB === ""}
                          invalid={errors.doB !== ""}
                          onBlur={this.handleBlur("doB")}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.doB}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="salaryScale" md={4}>
                        Hệ số lương
                      </Label>
                      <Col md={8}>
                        <Input
                          type="number"
                          step="0.1"
                          id="salaryScale"
                          name="salaryScale"
                          value={this.state.salaryScale}
                          valid={errors.salaryScale === ""}
                          invalid={errors.salaryScale !== ""}
                          onBlur={this.handleBlur("salaryScale")}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.salaryScale}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="startDate" md={4}>
                        Ngày vào công ty
                      </Label>
                      <Col md={8}>
                        <Input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={this.state.startDate}
                          valid={errors.startDate === ""}
                          invalid={errors.startDate !== ""}
                          onBlur={this.handleBlur("startDate")}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.startDate}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="department" md={4}>
                        Phòng ban
                      </Label>
                      <Col md={8}>
                        <Input
                          type="select"
                          id="department"
                          name="department"
                          value={this.state.department}
                          valid={errors.department === ""}
                          invalid={errors.department !== ""}
                          onChange={this.handleInputChange}
                        >
                          <option value="Finance">Finance</option>
                          <option value="Sale">Sale</option>
                          <option value="HR">HR</option>
                          <option value="Marketing">Marketing</option>
                          <option value="IT">IT</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="annualLeave" md={4}>
                        Số ngày nghỉ còn lại
                      </Label>
                      <Col md={8}>
                        <Input
                          type="number"
                          id="annualLeave"
                          name="annualLeave"
                          value={this.state.annualLeave}
                          valid={errors.annualLeave === ""}
                          invalid={errors.annualLeave !== ""}
                          onBlur={this.handleBlur("annualLeave")}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.annualLeave}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="overTime" md={4}>
                        Số ngày đã làm thêm
                      </Label>
                      <Col md={8}>
                        <Input
                          type="number"
                          id="overTime"
                          name="overTime"
                          value={this.state.overTime}
                          valid={errors.overTime === ""}
                          invalid={errors.overTime !== ""}
                          onBlur={this.handleBlur("overTime")}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.overTime}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm={{ offset: 4, size: 8 }}>
                        <Button color="primary" type="submit">
                          Thêm vào danh sách
                        </Button>{" "}
                        <Button onClick={this.toggleModal}>Hủy bỏ</Button>
                      </Col>
                    </FormGroup>
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

export default StaffList;

import React from "react";
import { Button, Label, Row, Col } from "reactstrap";
import { Form, Control, Errors } from "react-redux-form";

function StaffInfoForm(props) {
  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;
  const isNumber = (val) => !isNaN(Number(val));
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default StaffInfoForm;

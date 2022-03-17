import React, { Component } from "react";
import { Button, Modal, Row, Col, ModalHeader, ModalBody } from "reactstrap";
import { Form } from "react-redux-form";
import StaffInfoForm from "./StaffInfoForm";

function EditStaffForm(props) {
  return (
    <Modal isOpen={props.isEditFormOpen} toggle={this.toggleModal}>
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
          <StaffInfoForm />
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
  );
}

export default EditStaffForm;

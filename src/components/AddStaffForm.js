import React from "react";
import { Button, Row, Col } from "reactstrap";
import { Form } from "react-redux-form";
import StaffInfoForm from "./StaffInfoForm";

function AddStaffForm(props) {
    return (
        <Form
          model="addStaff"
          onSubmit={(values) => props.handleAddStaffForm(values)}
        >
          <StaffInfoForm />
          <Row className="form-group">
            <Col sm={{ offset: 4, size: 8 }}>
              <Button color="primary" type="submit">
                Thêm nhân viên
              </Button>{" "}
              <Button onClick={props.toggleAddStaffModal}>Hủy bỏ</Button>
            </Col>
          </Row>
        </Form>
  );
}
export default AddStaffForm;
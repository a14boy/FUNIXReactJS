import React from "react";
import { Button, Row, Col } from "reactstrap";
import { Form } from "react-redux-form";
import StaffInfoForm from "./StaffInfoFormComponent";

function EditStaffForm(props) {
  return (
    <Form
      model="addStaff"
      onSubmit={(value) => props.handleEditStaffForm(value)}
    >
      <StaffInfoForm />
      <Row className="form-group">
        <Col sm={{ offset: 4, size: 8 }}>
          <Button color="primary" type="submit">
            Chỉnh sửa
          </Button>{" "}
          <Button onClick={props.toggleEditStaffModal}>Hủy bỏ</Button>
        </Col>
      </Row>
    </Form>
  );
}
export default EditStaffForm;

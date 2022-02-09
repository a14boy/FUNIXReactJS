import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function SortComponent(props) {
  const handleSortData = (event) => {
    event.preventDefault();
    props.onSubmit(event.target[0].value);
  };
  return (
    <div>
      <Form id="sortForm" inline onSubmit={handleSortData}>
        <FormGroup name="sortData" className="ml-auto">
          <Label for="sortParam">
            <b>Mức lương: </b>
          </Label>
          <Input id="sortType" type="select">
            <option>Tăng dần</option>
            <option>Giảm dần</option>
          </Input>
          <Button type="submit">
            <span className="fa fa-filter fa-lg"></span>
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default SortComponent;

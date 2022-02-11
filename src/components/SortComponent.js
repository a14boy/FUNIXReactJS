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
        <FormGroup name="sortData" className="ml-auto row mr-0">
          <Label for="sortParam" className="col-5 p-0 m-0">
            <b>Mức lương: </b>
          </Label>
          <Input id="sortType" type="select" className="col-5">
            <option>Tăng</option>
            <option>Giảm</option>
          </Input>
          <Button type="submit" className="col-2">
            <span className="fa fa-filter fa-lg"></span>
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default SortComponent;

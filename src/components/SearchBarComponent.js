import React from "react";
import { Form, Input, Button, Label, FormGroup } from "reactstrap";

function SearchBar(props) {
  const handleSearchKey = (event) => {
    event.preventDefault();
    props.onSubmit(event.target[0].value);
  };
  return (
    <Form id="searchForm" inline onSubmit={handleSearchKey}>
      <FormGroup>
        <Label forHtml="search" name="search"></Label>
        <Input id="search" name="search" type="text"></Input>
        <Button type="submit">Tìm kiếm</Button>
      </FormGroup>
    </Form>
  );
}

export default SearchBar;

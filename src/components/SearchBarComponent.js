import React from "react";
import { Form, Input, Button, Label, FormGroup } from "reactstrap";

function SearchBar(props) {
  const handleSearchKey = (event) => {
    event.preventDefault();
    props.onSubmit(event.target[0].value);
  };
  return (
    <Form id="searchForm" inline onSubmit={handleSearchKey}>
      <FormGroup className="ml-auto">
        <Label for="search" name="search"></Label>
        <Input
          id="search"
          name="search"
          type="text"
          placeholder="Tìm kiếm ..."
        ></Input>
        <Button type="submit">
          <span className="fa fa-search fa-lg"></span>
        </Button>
      </FormGroup>
    </Form>
  );
}

export default SearchBar;

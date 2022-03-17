import React from "react";
import { Button } from "reactstrap";

function DelEditStaff(props) {
  if (props.isShow) {
    return (
      <div className="col-12">
        <div className="row">
          <Button
            onClick={props.handleEdit}
            outline
            name="edit Btn"
            color="info"
            className="col-6"
          >
            <span className="fa fa-pencil-square-o fa-sm"> Sửa</span>
          </Button>
          <Button
            onClick={props.handleDel}
            outline
            name="del Btn"
            color="danger"
            className="col-6"
          >
            <span className="fa fa-trash-o fa-sm"> Xóa</span>
          </Button>
        </div>
      </div>
    );
  } else return <div></div>;
}

export default DelEditStaff;

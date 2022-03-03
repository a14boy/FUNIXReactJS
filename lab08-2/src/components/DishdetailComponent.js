import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Modal,
  ModalHeader,
  Button,
  Row,
  Col,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div>
        <Card id="selectedDish">
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else return <div></div>;
}
function RenderComments({ comments, addComment, dishId }) {
  if (comments != null)
    return (
      <div>
        <h4>Commmnent: </h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  --{comment.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
              </li>
            );
          })}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  else return <div></div>;
}
const DishDetail = (props) => {
  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-6 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    console.log("current State is: " + JSON.stringify(values));
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"> Submit Comment</span>
        </Button>
        <Modal
          outline
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader
            close={
              <button className="close" onClick={this.toggleModal}>
                ×
              </button>
            }
          >
            Submit comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={3}>
                  Rating
                </Label>
                <Col md={9}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    defaultValue="5"
                  >
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={3}>
                  Your Name
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(4),
                      maxLength: maxLength(20),
                    }}
                  />
                  <Errors
                    model=".author"
                    className="text-danger"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 4 characters",
                      maxLength: "Must be 20 characters less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={3}>
                  Comment
                </Label>
                <Col md={9}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="5"
                    className="form-control"
                    validators={{
                      minLength: minLength(10),
                      maxLength: maxLength(100),
                    }}
                  />
                  <Errors
                    model=".comment"
                    className="text-danger"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 10 characters",
                      maxLength: "Must be 100 characters less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={{ offset: 3, size: 9 }}>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>{" "}
                  <Button onClick={this.toggleModal}>Cancel</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;

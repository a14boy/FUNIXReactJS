import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';
import dateFormat from 'dateformat'; 

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        selectedDish: null
    }
}

onDishSelect(dish) {
    this.setState({ selectedDish: dish});
}

renderDish(dish) {
    if (dish != null)
        return(
            <Card>
                <div className="col-sm-6 col-lg-4">
                  <CardImg top src={dish.image} alt={dish.name} />
                </div>
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>Ngày sinh: {dateFormat(dish.doB,"dd/mm/yyyy")}</CardText>
                  <CardText>Ngày vào công ty: {dateFormat(dish.startDate,"dd/mm/yyyy")}</CardText>
                  <CardText>Phòng ban: {dish.department.name}</CardText>
                  <CardText>Số ngày nghỉ còn lại: {dish.annualLeave}</CardText>
                  <CardText>Số ngày đã làm thêm: {dish.overTime}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div className="staffInfo col-12 col-sm-6 col-lg-4">
                <Card  key={dish.id} onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardTitle className="text-center">{dish.name}</CardTitle>
                </Card> 
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
              {menu}
            </div>
            <div className="row">
              <div  className="col-12">
                {this.renderDish(this.state.selectedDish)}
              </div>
            </div>
          </div>
        );
    }
}

export default StaffList;
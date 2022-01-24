import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';
import dateFormat from 'dateformat'; 

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        selectedDish: null,
        setColumn : "0",
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event){
    this.setState ({setColumn: event.target.value});
    this.render;
  }

  getClass(col){
    switch(col){
      case "1": return "col-12"; break;
      case "2": return "col-6"; break;
      case "3": return "col-4"; break;
      case "4": return "col-3"; break;
      case "6": return "col-2"; break;
      default: return "col-sm-6 col-lg-4";
    }
  }

  onStaffSelect(dish) {
      this.setState({ selectedStaff: dish});
  }

  renderStaffInfo(dish) {
      if (dish != null)
          return(
              <Card id='viewStaffInfo'>
                <div className='row'>
                  <div className="col-sm-6 col-lg-4">
                    <CardImg top src={dish.image} alt={dish.name} />
                  </div >
                  <CardBody className="col-sm-6 col-lg-8">
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>Ngày sinh: {dateFormat(dish.doB,"dd/mm/yyyy")}</CardText>
                    <CardText>Ngày vào công ty: {dateFormat(dish.startDate,"dd/mm/yyyy")}</CardText>
                    <CardText>Phòng ban: {dish.department.name}</CardText>
                    <CardText>Số ngày nghỉ còn lại: {dish.annualLeave}</CardText>
                    <CardText>Số ngày đã làm thêm: {dish.overTime}</CardText>
                  </CardBody>
                </div>
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
            <div key={dish.id} className={this.getClass(this.state.setColumn)}>
              <a href = "#selectedStaffInfo" >
                <Card className="staffInfo" onClick={() => this.onStaffSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardTitle className="text-center">{dish.name}</CardTitle>
                </Card> 
              </a>
            </div>
          );
      });

      return (
        <div className="container">
          <div className='row container'>
            <p><b>Chọn số cột hiển thị: </b>
            <span>
              <select id="setColumn" onChange={this.handleSelect}> 
                <option value="0" defaultChecked>Tự động</option>
                <option value="1">1 Cột</option>
                <option value="2">2 Cột</option>
                <option value="3">3 Cột</option>
                <option value="4">4 Cột</option>
                <option value="6">6 Cột</option>
              </select>
            </span></p>
          </div>
          <div className="row">
              {menu}
          </div>
          <div className="row">
            <div  className="col-12 " id="selectedStaffInfo">
              {this.renderStaffInfo(this.state.selectedStaff)}
            </div>
          </div>
        </div>
      );
  }
}

export default StaffList;
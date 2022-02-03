import React from 'react';
import { Card, CardImg} from 'reactstrap';

function RenderStaffList({ dish, onClick }){
  return (
    <Link to={`/StaffList/${dish.id}`} >
      <div className='col-sm-6 col-md-4 col-lg-2'>
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <p>{dish.name}</p>
        </Card>
      </div>
    </Link>
);
}
const StaffList = (props) => {
  const staffList = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderStaffList dish={dish} onClick={props.onClick} />
      </div>
    );
  });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Nhân viên</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                {staffList}
            </div>
        </div>
    );
};

export default StaffList;
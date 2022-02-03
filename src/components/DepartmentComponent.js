import React from 'react';
import { Card, CardTitle, CardText} from 'reactstrap';

function RenderDepartment({department}){
    return(
            <Card>
                <CardTitle>{department.name}</CardTitle>
                <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
            </Card>
    )
}
const Departments = (props) =>{
    const departmentDetail = props.departments.map(
        (department) => {
            return(
                <div key={department.id} className='col-sm-6 col-md-4 col-lg-2'>
                    <RenderDepartment department={department} /> 
                </div>
            );
        }
    )
    return(
        <div className='container-fluid'>
            <div className='row'>
                {departmentDetail}
            </div>     
        </div>
    )
}

export default Departments;
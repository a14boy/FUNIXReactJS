import React from 'react';
import { Card, CardTitle, CardText} from 'reactstrap';

function RenderPayroll({staff}){
    return(
            <Card>
                <CardTitle>{staff.name}</CardTitle>
                <CardText>Mã nhân viên: {staff.numberOfStaff}</CardText>
                <CardText>Hệ số lương: 1</CardText>
                <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
            </Card>
    )
}
const Payrolls = (props) =>{
    const departmentDetail = props.departments.map(
        (department) => {
            return(
                <div key={department.id} className='col-sm-6 col-md-4 col-lg-2'>
                    <RenderDepartments department={department} /> 
                </div>
            )
        }
    )
}
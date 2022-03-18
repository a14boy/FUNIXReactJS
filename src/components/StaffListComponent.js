import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { actions } from "react-redux-form";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBarComponent";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";
import EditStaffForm from "./EditStaffFormComponent";
import DelEditStaff from "./DelEditStaffBtnComponent";
import AddStaffForm from "./AddStaffFormComponent";

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: "",
      isAddStaffModalOpen: false,
      isShow: false,
      isEditFormOpen: false,
      pickedStaff: {},
      resetAddStaffForm: () => actions.reset("addStaff"),
    };

    this.showEditDeleteBtn = this.showEditDeleteBtn.bind(this);
    this.showEditStaffForm = this.showEditStaffForm.bind(this);
    this.toggleAddStaffModal = this.toggleAddStaffModal.bind(this);
    this.toggleEditStaffModal = this.toggleEditStaffModal.bind(this);
    this.handleAddStaffForm = this.handleAddStaffForm.bind(this);
    this.handleEditStaffForm = this.handleEditStaffForm.bind(this);
  }

  showEditDeleteBtn() {
    this.setState({
      isShow: !this.state.isShow,
    });
  }
  showEditStaffForm(staff) {
    this.toggleEditStaffModal();
    this.setState({
      pickedStaff: staff,
    });
  }

  toggleAddStaffModal() {
    this.setState({
      isAddStaffModalOpen: !this.state.isAddStaffModalOpen,
    });
  }

  toggleEditStaffModal() {
    this.setState({
      isEditFormOpen: !this.state.isEditFormOpen,
    });
  }
  handleAddStaffForm(value) {
    const newStaff = {
      name: value.name,
      doB: value.doB,
      salaryScale: value.salaryScale,
      startDate: value.startDate,
      departmentId:
        value.department === "Sale"
          ? "Dept01"
          : value.department === "HR"
          ? "Dept02"
          : value.department === "Marketing"
          ? "Dept03"
          : value.department === "IT"
          ? "Dept04"
          : "Dept05",
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: "/assets/images/alberto.png",
    };
    this.props.postStaff(newStaff);
    this.state.resetAddStaffForm();
    this.toggleAddStaffModal();
  }
  handleEditStaffForm(editedValue) {
    let editedStaff = Object.assign(this.state.pickedStaff, editedValue);
    this.props.editStaff(editedStaff);
    this.resetAddStaffForm();
  }

  render() {
    const onSubmitSearch = (key) => {
      this.setState({ searchKey: key });
    };
    if (this.props.staffs.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffs.errMess) {
      return <h4>{this.props.staffs.errMess}</h4>;
    } else {
      const staffList = this.props.staffs.staffs
        .filter((staff) => staff.name)
        .filter((staff) =>
          staff.name.toLowerCase().includes(this.state.searchKey.toLowerCase())
        )
        .map((staff) => {
          return (
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 mb-3">
              <FadeTransform
                in
                transformProps={{
                  exitTransform: "scale(0.5) translateY(-50%)",
                }}
              >
                <DelEditStaff
                  isShow={this.state.isShow}
                  showEditStaffForm={() => this.showEditStaffForm(staff)}
                  handleDel={() => this.props.deleteStaff(staff.id)}
                />
                <Link to={`/stafflist/${staff.id}`}>
                  <Card>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <CardText className="text-center">{staff.name}</CardText>
                  </Card>
                </Link>
              </FadeTransform>
            </div>
          );
        });
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6">
              <h3>
                Nhân viên{" "}
                <Button outline onClick={this.toggleAddStaffModal}>
                  <span className="fa fa-plus fa-lg"></span>
                </Button>
                <Button outline onClick={this.showEditDeleteBtn}>
                  <span className="fa fa-pencil fa-lg"></span>
                </Button>
                <Modal
                  isOpen={this.state.isAddStaffModalOpen}
                  toggle={this.toggleAddStaffModal}
                >
                  <ModalHeader
                    close={
                      <button
                        className="close"
                        onClick={this.toggleAddStaffModal}
                      >
                        ×
                      </button>
                    }
                    toggle={this.toggleAddStaffModal}
                  >
                    Thêm nhân viên
                  </ModalHeader>
                  <ModalBody>
                    <AddStaffForm
                      toggleAddStaffModal={this.toggleAddStaffModal}
                      handleAddStaffForm={this.handleAddStaffForm}
                    />
                  </ModalBody>
                </Modal>
                <Modal
                  isOpen={this.state.isEditFormOpen}
                  toggle={this.toggleEditStaffModal}
                >
                  <ModalHeader
                    close={
                      <button
                        className="close"
                        onClick={this.toggleEditStaffModal}
                      >
                        ×
                      </button>
                    }
                  >
                    Sửa thông tin nhân viên
                  </ModalHeader>
                  <ModalBody>
                    <EditStaffForm
                      toggleEditStaffModal={this.toggleEditStaffModal}
                      handleEditStaffForm={this.handleEditStaffForm}
                      staff={this.state.pickedStaff}
                    />
                  </ModalBody>
                </Modal>
              </h3>
            </div>
            <div className="col-sm-12 col-md-6">
              <SearchBar onSubmit={onSubmitSearch} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <hr />
            </div>
          </div>
          <div className="row">{staffList}</div>
        </div>
      );
    }
  }
}

export default StaffList;

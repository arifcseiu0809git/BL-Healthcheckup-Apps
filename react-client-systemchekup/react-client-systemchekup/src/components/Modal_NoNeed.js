import React, { Component } from "react";
 
// importing all of these classes from reactstrap module
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
 
// build a class base component
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  // changes handler to check if a checkbox is checed or not
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
 
  // rendering modal in the custommodal class received toggle and on save as props,
  render() {
    const { toggle, onSave } = this.props;
    //alert('in render json: '+JSON.stringify( this.props));
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> System Checkup Items detail </ModalHeader>
        <ModalBody>
         
          <Form>
 
            {/* 3 formgroups
            1 title label */}
            <FormGroup>
            <Label for="description">Report Date: {this.state.activeItem.REPORT_DATE}</Label>
            </FormGroup>
            <FormGroup>
            <Label for="description">Application Name: {this.state.activeItem.APPLICATION}</Label>
            </FormGroup>
            <FormGroup>
            <Label for="description">Application Check Point: {this.state.activeItem.APPLICATION_CHECKPOIN}</Label>
            </FormGroup>
            <FormGroup>
            <Label for="description">Target Qty: {this.state.activeItem.TARGET_QTY}</Label>
            </FormGroup>
            {/* 2 description label */}
            <FormGroup>
              <Label for="description">Actual Qty: {this.state.activeItem.ACTUL_QTY}</Label>
              {/* <Input
                type="text"
                name="description"
                value={this.state.activeItem.APPLICATION}
                onChange={this.handleChange}
                placeholder="Enter Task Description"
              /> */}
            </FormGroup>
 
            {/* 3 completed label */}
            <FormGroup check>
              <Label for="IsError">
                
                <Input
                  type="checkbox"
                  name="IsError"
                  checked={this.state.activeItem.ISERROR > 0 ? true:false }
                  // onChange={this.handleChange}
                />      
                System KPI Status         
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        {/* create a modal footer */}
        <ModalFooter>
          <Button color="primary" onClick={() => onSave(this.state.activeItem)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CustomModal
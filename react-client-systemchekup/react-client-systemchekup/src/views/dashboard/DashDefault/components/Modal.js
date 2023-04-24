import React, { Component } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// importing all of these classes from reactstrap module
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  CardBody,
  CardHeader
} from "reactstrap";

// build a class base component
class CustomModal extends Component {
  constructor(props) {
    super(props);
    //alert('props: '+JSON.stringify(this.props.activeItem))
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  // changes handler to check if a checkbox is checed or not
  // handleChange = e => {
  //   let { name, value } = e.target;
  //   if (e.target.type === "checkbox") {
  //     value = e.target.checked;
  //   }
  //   const activeItem = { ...this.state.activeItem, [name]: value };
  //   this.setState({ activeItem });
  // };

  // rendering modal in the custommodal class received toggle and on save as props,
  render() {
    const { toggle, onSave } = this.props;
    //alert('in render json: '+JSON.stringify( this.props));
    return (
      <Modal isOpen={true} toggle={toggle}>
        {/* <ModalHeader toggle={toggle}> System Checkup Items detail </ModalHeader> */}
        <div class="modal-header" id="modal-header">
                    <h4 class="modal-title" id="modal-title">
                    System Checkup Items detail
                    </h4>
                </div>
        <ModalBody>
          <Card style={{ width: '29rem', height: '15.3rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item action variant="info">Report Date: {this.state.activeItem.REPORT_DATE}</ListGroup.Item>
              <ListGroup.Item action variant="info">Application Name: {this.state.activeItem.APPLICATION}</ListGroup.Item>
              <ListGroup.Item action variant="info">Application Check Point: {this.state.activeItem.APPLICATION_CHECKPOINT}</ListGroup.Item>
              <ListGroup.Item action variant="info">Target Qty: {this.state.activeItem.TARGET_QTY}</ListGroup.Item>
              <ListGroup.Item action variant="info">Actual Qty: {this.state.activeItem.ACTUAL_QTY}</ListGroup.Item>
              <ListGroup.Item action variant="info">
                <Row>
                  <Col>System KPI Status</Col>
                  <Col><Input
                    type="checkbox"
                    name="IsError"
                    checked={this.state.activeItem.ISERROR > 0 ? false : true}
                  // onChange={this.handleChange}
                  /></Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>


          {/* <Form>
            <FormGroup>
            <Label for="description">Report Date: {this.state.activeItem.REPORT_DATE}</Label>
            </FormGroup>
            <FormGroup>
            <Label for="description">Application Name: {this.state.activeItem.APPLICATION}</Label>
            </FormGroup>
            <FormGroup>
            <Label for="description">Application Check Point: {this.state.activeItem.APPLICATION_CHECKPOINT}</Label>
            </FormGroup>
            <FormGroup>
            <Label for="description">Target Qty: {this.state.activeItem.TARGET_QTY}</Label>
            </FormGroup>
            <FormGroup>
              <Label for="description">Actual Qty: {this.state.activeItem.ACTUAL_QTY}</Label>
            </FormGroup>
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
          </Form> */}
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
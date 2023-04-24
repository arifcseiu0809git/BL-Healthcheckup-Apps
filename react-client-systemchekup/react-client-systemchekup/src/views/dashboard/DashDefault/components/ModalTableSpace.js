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
    //alert('props: '+JSON.stringify(this.props.tableSpaceItem))
    this.state = {
      tableSpaceItem: this.props.tableSpaceItem
    };
  }
  // changes handler to check if a checkbox is checed or not
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const tableSpaceItem = { ...this.state.tableSpaceItem, [name]: value };
    this.setState({ tableSpaceItem });
  };

  // rendering modal in the custommodal class received toggle and on save as props,
  render() {
    const { toggle, onSave } = this.props;
    //alert('in render json: '+JSON.stringify( this.props));
    return (
      <Modal isOpen={true} toggle={toggle}>
        {/* <ModalHeader toggle={toggle}> Table Space Items detail 
        </ModalHeader> */}
        <div class="modal-header" id="modal-header">
                    <h4 class="modal-title" id="modal-title">
                    Table Space Items detail
                    </h4>
                </div>
        <ModalBody>
          <Card style={{ width: '29rem', height: '21.13rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item action variant="info">Report Date: {this.state.tableSpaceItem.REPORT_DATE}</ListGroup.Item>
              <ListGroup.Item action variant="info">Table Space Name: {this.state.tableSpaceItem.TABLESPACE_NAME}</ListGroup.Item>
              <ListGroup.Item action variant="info">Total Space Size: {this.state.tableSpaceItem.TOTAL_SIZE}</ListGroup.Item>
              <ListGroup.Item action variant="info">Free Size: {this.state.tableSpaceItem.FREE_SIZE}</ListGroup.Item>
              <ListGroup.Item action variant="info">Free Percent: {this.state.tableSpaceItem.FREE_PERCENT}</ListGroup.Item>
              <ListGroup.Item action variant="info">Last Day Percent: {this.state.tableSpaceItem.LAST_DAY_PERCENT}</ListGroup.Item>
              <ListGroup.Item action variant="info">Daily consumed percent space GB: {this.state.tableSpaceItem.DAILY_CONSUMED_PERCENT_GB}</ListGroup.Item>
              <ListGroup.Item action variant="info">Schema List: {this.state.tableSpaceItem.SCHEMA_LIST}</ListGroup.Item>
            </ListGroup>
          </Card>
        </ModalBody>
        {/* create a modal footer */}
        <ModalFooter>
          <Button color="primary" onClick={() => onSave(this.state.tableSpaceItem)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CustomModal
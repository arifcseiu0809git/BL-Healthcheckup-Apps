import React, { useEffect, Component, useState } from 'react';
import { Row, Col, Card, Table, Form } from 'react-bootstrap';
import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import axios from 'axios';

import "./styles.css";
import Modal from '../components/ModalTableSpace';
import { API_SERVER } from './../../../../config/constant';

class Tablespacecheckup extends Component {
    constructor(props) {
        super(props);
        this.state = {

            viewCompleted: 1,
            tableSpaceItem: {
                APPLICATION: "",
                APPLICATION_CHECKPOINT: "",
                ISERROR: false
            },

            // this list stores all the completed tasks
            tableSpaceList: []
        };
    }

    // Add componentDidMount()
    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios //Axios to send and receive HTTP requests
            .get(API_SERVER+"GetTablespaceItems/")
            .then(res => this.setState({ tableSpaceList: res.data }))
            .catch(err => console.log(err));
    };

    // handleChange = e => {
    // 	let { name, value } = e.target;
    // 	if (e.target.type === "checkbox") {
    // 	  value = e.target.checked;
    // 	   alert(value);
    // 	}
    // 	const activeItem = { ...this.state.activeItem, [name]: value };
    // 	this.setState({ activeItem });
    //   };

    displayCompleted = status => {
        console.log('for display' + status);
        alert('for display' + status);
        if (status) {
            return this.setState({ viewCompleted: 1 });
        }
        return this.setState({ viewCompleted: 0 });
    };
    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <span
                    onClick={() => this.displayCompleted(1)}
                    className={this.state.viewCompleted ? "active" : ""}
                >
                    System KPI have Issue
                </span>
                <span
                    onClick={() => this.displayCompleted(0)}
                    className={this.state.viewCompleted ? "" : "active"}
                >
                    KPI Ok
                </span>
            </div>
        );
    };
    // Main variable to render items on the screen
    renderItems = () => {
        // const { viewCompleted } = this.state;
        // console.log('for items' + viewCompleted);

        // const newItems = this.state.taskList.filter(
        // 	(item) => item.ISERROR === viewCompleted
        // );

        const newItemss = this.state.tableSpaceList;

        return newItemss.map((item) => (
            <tr key={item.ID}>
                {/* <th scope="row">{item.ID}</th> */}
                <td>{item.REPORT_DATE}</td>
                <td>{item.TABLESPACE_NAME}</td>
                <td>{item.TOTAL_SIZE}</td>
                {/* <td>{item.TARGET_QTY}</td>
				<td>{item.ACTUL_QTY}</td> */}
                {/* <td>{item.ISERROR}</td> */}
                <td>
                    <button
                        onClick={() => this.detailsItem(item)}
                        className="btn btn-secondary mr-2"
                    >
                        Details
                    </button>
                </td>
            </tr>
        ));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };
    handleSubmit = (item) => {
        this.toggle();
        alert("save" + JSON.stringify(item));
    };

    // Submit an item
    handleSubmit = (item) => {
        this.toggle();
        if (item.ID) {
            // if old post to edit and submit
            axios
                .put(API_SERVER+`tasks/${item.ID}/`, item)
                .then((res) => this.refreshList());
            return;
        }
        // if new post to submit
        axios
            .post(API_SERVER+"tasks/", item)
            .then((res) => this.refreshList());
    };

    // Delete item
    handleDelete = (item) => {
        axios
            .delete(API_SERVER+`tasks/${item.ID}/`)
            .then((res) => this.refreshList())
            .catch(err => console.log(err));
    };
    // handleDelete = (item) => {
    // 	alert("delete" + JSON.stringify(item));
    // };

    // Create item
    createItem = () => {
        //alert('for new item creation');
        const item = { APPLICATION: "", APPLICATION_CHECKPOINT: "", ISERROR: false };
        this.setState({ tableSpaceItem: item, modal: !this.state.modal });
    };

    //Details item
    detailsItem = (item) => {
        //alert(JSON.stringify(item));
        this.setState({ tableSpaceItem: item, modal: !this.state.modal });
    };

    // Start by visual effects to viewer
    render() {
        return (

            <React.Fragment>
                <Row>
                    <Col>
                        <Card.Body>
                            <Table responsive variant="info">
                                <thead>
                                    <tr>
                                        {/* <th>#</th> */}
                                        <th>Report Date</th>
                                        <th>Table Space Name</th>
                                        <th>Total Table Size (GB)</th>
                                        {/* <th>Target Qty</th>
											<th>Actual Qty</th> */}
                                        {/* <th>Is Error</th> */}
                                        {/* <th>System KPI</th>			 */}
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderItems()}
                                    {this.state.modal ? (
                                        <Modal
                                            tableSpaceItem={this.state.tableSpaceItem}
                                            toggle={this.toggle}
                                            onSave={this.handleSubmit}
                                        />
                                    ) : null}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Tablespacecheckup;

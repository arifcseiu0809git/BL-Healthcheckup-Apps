import React, { useEffect, Component,useState } from 'react';
import { Row, Col, Card, Table, Form } from 'react-bootstrap';
import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import axios from 'axios';

import "./styles.css";
import Modal from '../components/Modal' ;
import { API_SERVER } from './../../../../config/constant';

class SystemCheckUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			supportedCheckbox:false,
		    setSupportedCheckbox:false,
			// activeItem: this.props.activeItem,
			viewCompleted: 1,
			activeItem: {
				APPLICATION: "",
				APPLICATION_CHECKPOINT: "",
				ISERROR: false
			},

			// this list stores all the completed tasks
			taskList: []
		};
	}

	// Add componentDidMount()
	componentDidMount() {
		this.refreshList();
	}


	refreshList = () => {
		axios //Axios to send and receive HTTP requests
			.get(API_SERVER+"GetSystemCheckupItems/")
			.then(res => this.setState({ taskList: res.data }))
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

	// this arrow function takes status as a parameter
	// and changes the status of viewCompleted to true
	// if the status is true, else changes it to false
	displayCompleted = status => {
		console.log('for display' + status);
		alert('for display' + status);
		if (status) {
			return this.setState({ viewCompleted: 1 });
		}
		return this.setState({ viewCompleted: 0 });
	};

	// this array function renders two spans that help control
	// the set of items to be displayed(ie, completed or incomplete)
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
		const { viewCompleted } = this.state;
		console.log('for items' + viewCompleted);

		const newItems = this.state.taskList.filter(
			(item) => item.ISERROR === viewCompleted
		);

		const newItemss = this.state.taskList;

		return newItemss.map((item) => (
			<tr key={item.ID}>
				{/* <th scope="row">{item.ID}</th> */}
				<td>{item.REPORT_DATE}</td>
				<td>{item.APPLICATION}</td>
				<td>{item.APPLICATION_CHECKPOINT}</td>
				{/* <td>{item.TARGET_QTY}</td>
				<td>{item.ACTUL_QTY}</td> */}
				{/* <td>{item.ISERROR}</td> */}
				<td>
					<label>
					{/* <div className="heading">Is KPI Issue?</div> */}
					<input
						type="checkbox"
						// name="freelancing"
						// checked={this.state.activeItem.completed}
						checked={item.ISERROR>0? false:true}
                        // onChange={this.handleChange}
					/>
					</label>
				</td>
				<td>
				<button
					onClick={() => this.detailsItem(item)}
					className="btn btn-secondary mr-2"
				>
					Details
				</button>
				</td>
			</tr>

			// <li
			// 	key={item.ID}
			// 	className="list-group-item d-flex justify-content-between align-items-center"
			// >
			// 	<span
			// 	className={`todo-title mr-2 ${
			// 		this.state.viewCompleted ? "completed-todo" : ""
			// 	}`}
			// 	title={item.APPLICATION_CHECKPOIN}
			// 	>
			// 	{item.APPLICATION}{item.APPLICATION_CHECKPOIN}
			// 	</span>

			// 	<span>
			// 	<button
			// 		onClick={() => this.editItem(item)}
			// 		className="btn btn-secondary mr-2"
			// 	>
			// 		Edit
			// 	</button>
			// 	<button
			// 		onClick={() => this.handleDelete(item)}
			// 		className="btn btn-danger"
			// 	>
			// 		Delete
			// 	</button>
			// 	</span>
			// </li>
		));
	};

	toggle = () => {
		//add this after modal creation
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
		this.setState({ activeItem: item, modal: !this.state.modal });
	};

	//Edit item
	detailsItem = (item) => {
		//alert('for details test: '+JSON.stringify(item));
		this.setState({ activeItem: item, modal: !this.state.modal });
	};

	// Start by visual effects to viewer
	render() {
		return (

			<React.Fragment>
				<Row>
					<Col>
						{/* <Card> */}
							{/* <Card.Header>
								<div className="">
									<button onClick={this.createItem} className="btn btn-info">
										Add Items
									</button>
								</div> 
								<div>
									{this.renderTabList()}
								</div>
								<span className="d-block m-t-5">
									use props <code>variant="info"</code> with <code>Table</code> component
								</span>
							</Card.Header> */}
							<Card.Body>
								<Table responsive variant="info">
									<thead>
										<tr>
											{/* <th>#</th> */}
											<th>Report Date</th>
											<th>Application Name</th>
											<th>Application Check point</th>
											{/* <th>Target Qty</th>
											<th>Actual Qty</th> */}
											{/* <th>Is Error</th> */}
											<th>System KPI</th>			
											<th>Details</th>								
										</tr>
									</thead>
									<tbody>										
										{this.renderItems()}
										{this.state.modal ? (
											<Modal
												activeItem={this.state.activeItem}
												toggle={this.toggle}
												onSave={this.handleSubmit}
											/>
										) : null}									
									</tbody>
								</Table>
								{/* <Form.Group>
									<Form.Check
										custom
										required
										// isInvalid={!supportedCheckbox}
										// isValid={supportedCheckbox}
										// type="checkbox"
										// id="supported-checkbox"
										// label="Check this custom checkbox"
										// feedback={supportedCheckbox ? false : 'Example invalid feedback text.'}
										// onChange={() => setSupportedCheckbox((prevState) => !prevState)}
									/>
								</Form.Group> */}
							</Card.Body>
						{/* </Card> */}
					</Col>
				</Row>
			</React.Fragment>

			// <main className="content">
			// 	<h1 className="text-success text-uppercase text-center my-4">
			// 	System Health Checkup
			// 	</h1>
			// 	<div className="row ">
			// 	<div className="col-md-6 col-sm-10 mx-auto p-0">
			// 		<div className="card p-3">
			// 		<div className="">
			// 			<button onClick={this.createItem} className="btn btn-info">
			// 			Add Items
			// 			</button>
			// 		</div>
			// 		{this.renderTabList()}
			// 		<ul className="list-group list-group-flush">
			// 			{this.renderItems()}
			// 		</ul>
			// 		</div>
			// 	</div>
			// 	</div>
			// 	{this.state.modal ? (
			// 	<Modal
			// 		activeItem={this.state.activeItem}
			// 		toggle={this.toggle}
			// 		onSave={this.handleSubmit}
			// 	/>
			// 	) : null}
			// </main>
		);
	}
}

export default SystemCheckUp;

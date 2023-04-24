import React, { Component, useEffect, useState } from 'react';
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { API_SERVER } from './../../../config/constant';

//class Tablespacecheckup extends Component {
export default function Tablespacecheckup() {
    //const Tablespacecheckup = () => {
    const [show, setShow] = useState(false);
    const [post, setPost] = React.useState([]);
    const [selectedData, setSelectedData] = React.useState([]);

    const hanldeClick = (selectedId) => {
        console.log('handle check: ' + JSON.stringify(selectedId))
        toggleModal(selectedId);
    };

    const hideModal = () => {
        setShow(false);
    };

    React.useEffect(() => {
        axios.get(API_SERVER + 'GetTablespaceItems').then((response) => {
            //console.log('first use: '+JSON.stringify(response.data));
            setPost(response.data);
        });
    }, []);

    // componentDidMount() {
    //     axios.get(apiUrl + '/GetTablespaceItems').then(response => response.data).then(
    //         (result) => {
    //             console.log('api res: ' + JSON.stringify(result));
    //             this.setState({
    //                 tablespaceItems: result
    //             });
    //         },
    //         (error) => {
    //             this.setState({ error });
    //         }
    //     )
    // }
    const toggleModal = (id) => {
        axios.get(API_SERVER + "GetTablespaceItemById/" + id).then((response) => {


            const json = JSON.parse(JSON.stringify(response.data))
            //var str = '[{"user":"Nate A.","time":"2018-08-31T21:26:14.432Z"},{"user":"Nate A.","time":"2018-08-31T21:26:27.567Z"}]'
            //var arr = JSON.parse(str);

            json.forEach(o => {
                console.log('for data checking..')
                console.log(o.ID)//<-- undefined because there is no "name" property

                console.log(o.REPORT_DATE)
                console.log(o['REPORT_DATE'])
                console.log(o.TABLESPACE_NAME)
            });

            //console.log('first use: '+JSON.stringify(json.item));

            setSelectedData(response.data);
            setShow(true);
        });
    }
    return (
        // <div className="row">
        //     <div className="col-md-12">
                <Table className="table">
                    <thead className="btn-primary">
                        <tr>
                            <th>REPORT DATE</th>
                            <th>TABLESPACE NAME</th>
                            <th>TOTAL SIZE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {post.map(item => (
                            <tr key={item.ID}  onClick={() => hanldeClick(item.ID)}>
                                <td>{item.REPORT_DATE}</td>
                                <td>{item.TABLESPACE_NAME}</td>
                                <td>{item.TOTAL_SIZE}</td>
                                {/* <td><Button variant="info" onClick={() => this.hanldeClick(item.ID)} >Details</Button>
                                            </td> */}
                            </tr>
                        ))}
                    </tbody>
                    {show && <Modal details={selectedData} handleClose={hideModal} />}
                </Table>
               
        //     </div>
        // </div>
    );
}


const Modal = ({ handleClose, details }) => {
    return (
        <div className="modal display-block">
            <section className="modal-main">
                <div className="App">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Report Date</th>
                                <th scope="col">Table Space Name</th>
                                <th scope="col">Total Size</th>
                                <th scope="col">Free Size</th>
                                <th scope="col">Percent</th>
                                <th scope="col">Last Day Percent</th>
                                <th scope="col">Daily Consumed Space GB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.REPORT_DATE}</td>
                                    <td>{item.TABLESPACE_NAME}</td>
                                    <td>{item.TOTAL_SIZE}</td>
                                    <td>{item.FREE_SIZE}</td>
                                    <td>{item.PERCENT}</td>
                                    <td>{item.LAST_DAY_PERCENT}</td>
                                    <td>{item.DAILY_CONSUMED_SPACE_GB}</td>
                                    {/* <td><Button variant="info" onClick={() => this.hanldeClick(item.ID)} >Details</Button>
                                            </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={handleClose}>close</button>
            </section>
        </div>
    );
};

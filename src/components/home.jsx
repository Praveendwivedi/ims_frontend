import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = {
        count: 0,
        factoryList: [],
        show: false,
        showForm:false,
        id:null,
        formData: {
            FactoryId: "",
            FactoryName: "",
            Location: ""
        }
    }
    componentDidMount() {
        console.log(process.env.REACT_APP_BACKEND_URL);
        axios.get(process.env.REACT_APP_BACKEND_URL+"factory").then(res => {
            this.setState({
                factoryList: res.data
            })
            console.log(res.data);
        })
    }
    handleDelete = (id) => {
        axios.delete(process.env.REACT_APP_BACKEND_URL+"factory/" + id).then(res => {

            console.log(res);
            this.setState({
                factoryList: res.data
            })
        })
    } 
    handleEdit = (data) => {
        this.setState({
            showForm:true,
            formData:data,
            id:data.id
        })
        console.log(data);
        // axios.delete(process.env.REACT_APP_BACKEND_URL+"factory/" + id).then(res => {

        //     console.log(res);
        //     this.setState({
        //         factoryList: res.data
        //     })
        // })
    }
    handleShow = () => {
        this.setState({
            show: true
        }

        )
    }
    handleClose = () => {
        this.setState({
            show: false,
            showForm:false
        })
    }
    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            formData : { ...this.state.formData, [e.target.name]: e.target.value }
    })
        console.log(this.state);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("clicked");
        console.log(e.target.value);
        axios.post(process.env.REACT_APP_BACKEND_URL+"factory", this.state.formData).then(res => {

            this.setState({
                factoryList: res.data
            })

        })
        this.setState({
            show: false
        })
    }
    handleSubmitForm= e =>{
        e.preventDefault();
        console.log(e.target.value);
        axios.put(process.env.REACT_APP_BACKEND_URL+"factory", this.state.formData).then(res => {

            this.setState({
                factoryList: res.data,
                showForm:false
            })

        })
    }
    render() {
        return (
            <div>
                <span style={{ color: "blue" }} className="badge badge-primary m-2">
                    <h1>Inventory Management System</h1>
                </span>
                <br></br>
                <Button variant="primary" onClick={this.handleShow}>
                    <img src="https://www.svgrepo.com/show/191571/plus.svg" height={20}/> Add New Factory
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Factory Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Factory name" name="FactoryName" value={FormData.FactoryName} onChange={this.handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter Factory location" name="Location" value={FormData.FactoryLocation} onChange={this.handleChange} required/>
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form >
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showForm} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Factory Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form onSubmit={this.handleSubmitForm}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Factory name" name="FactoryName" value={this.state.formData.FactoryName} onChange={this.handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter Factory location" name="Location" value={this.state.formData.Location} onChange={this.handleChange} required/>
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form >
                    </Modal.Body>
                </Modal>
                {/* <Example /> */}
                <Table bordered hover>
                    <thead key={1}>
                        <tr>
                            <th>id</th>
                            <th>Factory Name</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.factoryList.map(
                            factoryData =>
                                <tr key={factoryData.FactoryId}>
                                    <td>{factoryData.FactoryId}</td>
                                    <td><Link to={`/product/${factoryData.FactoryId}`} >
                                        {factoryData.FactoryName}
                                    </Link>
                                    </td>
                                    <td>{factoryData.Location}</td>
                                    <td>
                                        <button className="btn" onClick={() => this.handleDelete(factoryData.FactoryId)}>
                                            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a3/Delete-button.svg'/>
                                            </button> 
                                            <button className="btn" onClick={() => this.handleEdit(factoryData)}>
                                            <img src='https://www.svgrepo.com/show/36160/edit-button.svg' height={20}/>
                                            </button> 
                                            
                                            </td>
                                </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );
    }



}

export default Home;
















/*
// function Example() {
//     const [show, setShow] = useState(false);
//     const [formData, setFormData] = useState({
//         FactoryId: "",
//         FactoryName: "",
//         Location: ""
//     });
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const handleSubmit = (e) => {
//         // e.preventDefault();
//         console.log("clicked");
//         console.log(e.target.value);
//         axios.post(process.env.REACT_APP_BACKEND_URL+"factory", formData).then(res => {

//             console.log(res);

//         })
//         setShow(false);
//     }
//     const handleChange = (e) => {
//         console.log(e.target.value);
//         setFormData(
//             { ...formData, [e.target.name] :e.target.value }
//         )
//         console.log(formData);
//     }

//     return (
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Add New Factory
//             </Button>

//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Factory Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>


//                     <Form onSubmit={handleSubmit}>

//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control type="text" placeholder="Enter Factory name"  name="FactoryName" value={FormData.FactoryName} onChange={handleChange}/>
// {/*                             
//                             <Form.Text className="text-muted">
//                                 We'll never share your email with anyone else.
//                             </Form.Text> *}
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Location</Form.Label>
//                             <Form.Control type="text" placeholder="Enter Factory location"  name="Location" value={FormData.FactoryLocation} onChange={handleChange}/>
//                         </Form.Group>

//                         <Button variant="primary" type="submit" >
//                             Submit
//                         </Button>
//                     </Form >
//                 </Modal.Body>
//                 {/* <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="submit" >
//                         Submit
//                     </Button>
//                 </Modal.Footer> *}
//             </Modal>
//         </>
//     );
// }
*/

import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { Col, Row, Table } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
// function Product() {
//     let params=useParams();
//     useEffect(() => {
//         console.log(params.id);
//         // axios.get


//     }, [])

//     return(
//         <div>
//             <h1>Product</h1>
//         </div>
//     )
// }
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Product extends Component {
    state = {
        productList: [],
        show: false,
        showForm:false,
        formData: {
            ProductId: "",
            ProductName: "",
            Factory: this.props.params.id,
            Quantity: "",
            Description: ""
        },
        factoryData: {
            FactoryName: "",
            Location: ""
        }
    }
    componentDidMount() {
        console.log(this.props.params.id);
        axios.get(process.env.REACT_APP_BACKEND_URL + "product/" + this.props.params.id).then(res => {
            this.setState({
                productList: res.data
            })
            console.log(res.data);
        }).then(
            () => {
                axios.get(process.env.REACT_APP_BACKEND_URL + "factory/"+this.props.params.id).then(res => {
                    this.setState({
                        factoryData: res.data
                    })
                })

            }
        )
    }
    handleDelete = (id) => {
        axios.delete(process.env.REACT_APP_BACKEND_URL + "product/" + id).then(() => {
            axios.get(process.env.REACT_APP_BACKEND_URL + "product/" + this.props.params.id).then(res => {

                this.setState({
                    productList: res.data
                })

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
            show: false
        })
    }
    handleChange = (e) => {
        console.log(e.target.value);
        // let f = e.target.value

        this.setState(
            { formData: { ...this.state.formData, [e.target.name]: e.target.value } }
        )
        console.log(this.state);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("clicked");
        console.log(e.target.value);
        if(this.state.image){
            console.log("yes");
            
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + "product",
            this.state.formData).then(
                () => {
                    axios.get(process.env.REACT_APP_BACKEND_URL + "product/" + this.props.params.id).then(
                        res => {
                            this.setState({
                                productList: res.data
                            })
                        })
                })

        this.setState({
            show: false
        })
    }
    render() {
        return (
            <div>
                <span style={{ color: "blue" }} className="badge badge-primary m-2">
                    <h1>Inventory Management System</h1>
                </span>
                <br></br>
                <Row>
                    <Col>
                <h5>Factory Name:{this.state.factoryData.FactoryName}</h5>
                </Col>
                <Col>
                    <h5>Location:{this.state.factoryData.Location}</h5>
                    </Col>
                </Row>
                    
                
                <Button variant="primary" onClick={this.handleShow}>
                    <img src="https://www.svgrepo.com/show/191571/plus.svg" height={20}/> Add New Product
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter product name" name="ProductName" value={FormData.ProductName} onChange={this.handleChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="text" placeholder="Enter product quantity" name="Quantity" value={FormData.FactoryQuantity} onChange={this.handleChange} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter product Description" name="Description" value={FormData.Description} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="Image"  value={FormData.Image} onChange={e => {
                                console.log(e.target.name);
                                let f = e.target.files[0]

                                this.setState({         
                                    image: f
                            })
                                console.log("img", this.state)
                            }} />
                        </Form.Group>
                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form >
                    </Modal.Body>
                </Modal>
                {/* <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>E Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter product name" name="ProductName" value={this.state.formData.ProductName} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="text" placeholder="Enter product quantity" name="Quantity" value={this.state.formData.Quantity} onChange={this.handleChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form >
                    </Modal.Body>
                </Modal> */}
                {/* <Example /> */}
                <Table bordered hover>
                    <thead key={1}>
                        <tr>
                            <th>id</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.productList.map(
                            productData =>
                                <tr key={productData.ProductId}>
                                    <td>{productData.ProductId}</td>
                                    <td><Link to={`/product/detail/${productData.ProductId}`}>{productData.ProductName}</Link></td>
                                    <td>{productData.Quantity}</td>
                                    <td><button class='btn' onClick={() => this.handleDelete(productData.ProductId)}>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/a/a3/Delete-button.svg'/></button>
                                        {/* <button className="btn"> */}
                                        <Link to={`/product/detail/${productData.ProductId}`}>
                                            <img src='https://www.svgrepo.com/show/36160/edit-button.svg' height={20}/></Link>
                                            {/* </button>  */}
                                            </td>
                                </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default withParams(Product);



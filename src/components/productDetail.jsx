import React, { Component } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import { saveAs } from 'file-saver';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ProductDetail extends Component {
    state = {
        show: true,
        data: {
            ProductId: "",
            ProductName: "",
            Factory: this.props.params.id,
            Quantity: ""
        },
        formData: {
            ProductId: "",
            ProductName: "",
            Factory: this.props.params.id,
            Quantity: ""
        }
    }
    componentDidMount() {
        console.log(this.props.params.id);
        axios.get(process.env.REACT_APP_BACKEND_URL + "products/detail/" + this.props.params.id).then(res => {
            this.setState({
                formData: res.data,
                data:res.data
            });
            // this.setState({
            //     data: {...this.state.formData}
            // })
            console.log(res.data);
        })
    }
    // handleChange = (e) => {
    //     console.log(e.target.value);
    //     this.setState(
    //         this.state.formData = { ...this.state.formData, [e.target.name]: e.target.value }
    //     )
    //     console.log(this.state);

    // }
    handleChange = (e) => {
        // console.log(e.target.value);
        let f = e.target.value
        this.setState(
            { data: { ...this.state.data, [e.target.name]: e.target.value } }
        )
        console.log(this.state);

    }
    handleSubmit = e => {
        e.preventDefault();
        var data = new FormData();
        data.append("ProductId", this.state.data.ProductId);
        data.append("Factory", this.state.data.Factory);
        data.append("ProductName", this.state.data.ProductName);
        data.append("Quantity", this.state.data.Quantity);
        data.append("Description", this.state.data.Description);
        if(this.state.image){
             data.append("Image", this.state.image);
        }
        axios.put(process.env.REACT_APP_BACKEND_URL + "products/detail",
            data).then(res => {
                console.log(res);
                axios.get(process.env.REACT_APP_BACKEND_URL + "products/detail/" + this.props.params.id).then(res => {
                    this.setState({
                        formData: res.data
                    });

                })
                
            }


            )
    }
    render() {
        return (
            <div>
                <Container fluid="md" >
                    <Row>
                        {/* <h1>Data :</h1> */}
                        <Col>
                        <img src={"http://127.0.0.1:8000" + this.state.formData.Image} height="200"/><br></br>
                        <Button onClick={()=>{
                            saveAs("http://127.0.0.1:8000" + this.state.formData.Image,this.state.formData.Image)
                        }}> <img src="https://svgsilh.com/svg/2203950-ffffff.svg" height={30}/>Save Image</Button>
                        <ul className="list-group">
                            {Object.keys(this.state.formData).map((data, i) => <li key={i} className="list-group-item list-group-item-primary">{data}:{this.state.formData[data]}</li>)}
                        </ul>

                        
                        </Col>
                    

                    {/* <img src={"process.env.REACT_APP_BACKEND_URL"+"Photos/product/"+this.state.formData.Image}/> */}
                    <Col>
                    <h1>Product detail</h1>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group className="mb-3 sm" >
                            <Form.Label>Product Id</Form.Label>
                            <Form.Control value={this.state.data.ProductId} readOnly disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" name="ProductName" value={this.state.data.ProductName} onChange={this.handleChange}  required/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="text" placeholder="Enter product quantity" name="Quantity" value={this.state.data.Quantity} onChange={this.handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter product description" name="Description" value={this.state.data.Description} onChange={this.handleChange} required/>
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
                    </Col>
                    </Row>
                </Container>
            </div>);
    }
}

export default withParams(ProductDetail);
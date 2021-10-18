import React, {useState, useEffect, useCallback} from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

function ProductDetail({match, history}) {

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState('')
    const [products, setProducts] = useState([])
    const slug = match.params.slug

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_ROOT}/v1/products/${slug}/`
        }).then(response => {
            setProducts([response.data])
        })
    }, [slug])
    console.log(products)

    const addToCartHandler = () => {
        history.push(`/cart/${slug}?qty=${qty}?size=${size}`);
        window.location.reload();
    }
    const addToWishlistHandler = () => {
        history.push(`/wishlist/${slug}?qty=${qty}?size=${size}`);
        window.location.reload();
    }

    return (
        <div>
            <a className='btn btn-light my-3' style={{ position: 'absolute', left: '3%' }} href="/">Go Back</a>
                            <Row>
                                <div className="row">
                                    {products.map(product => (
                                        <div key={product.slug}>
                                            <Col md={6} style={{ position: 'absolute', left: '10%', top: '55%',
                                                transform: 'translate(-20%, -50%)'}}>
                                    <Carousel variant="dark">
                                    {product.productImages.map(image => (
                                        <Carousel.Item key={image.id} >
                                            <img src={image.image} width="500px"/>
                                        </Carousel.Item>))}
                                    </Carousel>
                                </Col>


                                <Col md={5} style={{ position: 'absolute', left: '60%', top: '55%',
                                                transform: 'translate(-20%, -50%)'}}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.title}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.numberInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            { product.numberInStock == 0 ? '' :
                                            <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.numberInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Size</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={size}
                                                                onChange={(e) => setSize(e.target.value)}
                                                            >
                                                                {product.productSizes.map(size => (
                                        <option key={size.size} value={size.size}>
                                            {size.size}
                                        </option>))}

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>}

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.numberInStock == 0}
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToWishlistHandler}
                                                    className='btn-block'
                                                    type='button'>
                                                    Add to Wishlist
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                                        </div>))}
                </div>
                            </Row>
        </div>)

}
export default ProductDetail;
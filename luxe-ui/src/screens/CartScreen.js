import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import {TrashFill} from 'react-bootstrap-icons'
import { Zoom } from 'react-preloaders2';

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('?')[1].split('=')[1]) : 1
    const size = location.search ? String(location.search.split('size=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems)
    console.log(size)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty, size))
        }
    }, [dispatch, productId, qty, size])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Zoom time={500}/>
            <Col md={8}>
                <h1 style={{position: 'relative', left: '5%'}}>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your shopping cart is empty.&nbsp;
                        <a href="/">Go Back</a>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            {item.productImages.slice(0,1).map(image => (
                                        <div key={image.id}>
                                            <Image src={image.image} fluid rounded />
                                        </div>))}
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/products/${item.product}`}>{item.title}</Link>
                                        </Col>

                                        <Col md={2}>
                                            ${item.price}
                                        </Col>

                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value), item.size))}
                                            >
                                                {

                                                    [...Array(item.numberInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.size}
                                                onChange={(e) => dispatch(addToCart(item.product, item.qty, String(e.target.value)))}
                                            >
                                                {item.productSizes.map(size => (
                                        <option key={size.size} value={size.size}>
                                            {size.size}
                                        </option>))}

                                            </Form.Control>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <TrashFill className='fas fa-trash'/>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
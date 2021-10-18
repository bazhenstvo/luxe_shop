import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import {addToWishlist, removeFromWishlist} from '../actions/cartActions'
import {TrashFill} from 'react-bootstrap-icons'
import { Zoom } from 'react-preloaders2';

function WishlistScreen({ match, location, history }) {
    const productId = match.params.id
    const [qty, setQty] = useState(location.search ? Number(location.search.split('?')[1].split('=')[1]) : 1)
    const [size, setSize] = useState(location.search ? String(location.search.split('size=')[1]) : 1)

    const dispatch = useDispatch()


    const wishlist = useSelector(state => state.wishlist)
    const { wishlistItems } = wishlist
    console.log(wishlistItems)
    console.log(location.search)
    console.log(size)

    useEffect(() => {
        if (productId) {
            dispatch(addToWishlist(productId, qty, size))
        }
    }, [dispatch, productId, qty, size])


    const addToCartHandler = (slug, qty, size) => {
        history.push(`/cart/${slug}?qty=${qty}?size=${size}`)
        dispatch(removeFromWishlist(slug))
        window.location.reload();
    }

    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id))
    }

    return (
        <Row>
            <Zoom time={500} />
            <h1 style={{position: 'relative', left: '5%'}}>Wishlist</h1>
            <Col md={10}>
                {wishlistItems.length === 0 ? (
                    <Message variant='info'>
                        Your wishlist is empty.&nbsp;
                        <a href="/">Go Back</a>
                    </Message>
                ) : (
                    <ListGroup>
                            {wishlistItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            {item.productImages.slice(0,1).map(image => (
                                        <div key={image.id}>
                                            <Image src={image.image} fluid rounded />
                                        </div>))}
                                        </Col>
                                        <Col md={2}>
                                            <Link to={`/products/${item.product}`}>{item.title}</Link>
                                        </Col>
                                        <Col md={1}>
                                            ${item.price}
                                        </Col>
                                        {item.numberInStock === 0 ? (<Col md={2}>Out of Stock</Col>) : (
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {

                                                    [...Array(item.numberInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>)}
                                        {item.numberInStock === 0 ? (<Col md={2}>Out of Stock</Col>) : (
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.size}
                                                onChange={(e) => setSize(e.target.value)}
                                            >
                                                {item.productSizes.map(size => (
                                        <option key={size.size} value={size.size}>
                                            {size.size}
                                        </option>))}

                                            </Form.Control>
                                        </Col>)}

                                        <Col mx={4}>
                                            <Button
                                                type='button'
                                                disabled={item.numberInStock == 0}
                                                onClick={() => addToCartHandler(item.product, item.qty, item.size)}
                                                variant='light'
                                            > Add to Cart
                                            </Button>
                                        </Col>
                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromWishlistHandler(item.product)}
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
        </Row>
    )
}

export default WishlistScreen
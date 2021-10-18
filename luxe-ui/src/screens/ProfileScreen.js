import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen({ history }) {

    const [username, setUsername] = useState('')
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [postal_code, setPostalcode] = useState('')
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy



    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.username || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails())
                dispatch(listMyOrders())
            } else {
                setUsername(user.username)
                setPhone(user.phone)
                setAddress(user.address)
                setFirstname(user.firstName)
                setLastname(user.lastName)
                setEmail(user.email)
                setCountry(user.country)
                setCity(user.city)
                setPostalcode(user.postalCode)

            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        {
            dispatch(updateUserProfile({
                'firstName': firstName,
                'lastName': lastName,
                'username': username,
                'phone': phone,
                'address': address,
                'city': city,
                'postalCode': postal_code,
                'country': country

            }))
            setMessage('')
        }

    }
    return (
        <Row>
            <Col md={3} style={{ position: 'absolute', left: '1%', paddingBottom: '5%' }}>
                <h2>User Profile</h2>

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <p><strong>{email}</strong></p>
                    </Form.Group>

                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='username'
                            placeholder='Enter username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                     <Form.Group controlId='first_name'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            type='first_name'
                            placeholder='Enter first name'
                            value={firstName}
                            onChange={(e) => setFirstname(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                     <Form.Group controlId='last_name'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            type='last_name'
                            placeholder='Enter last name'
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control

                            type='address'
                            placeholder='Enter address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='city'
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='country'
                        placeholder='Enter country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        required
                        type='postalCode'
                        placeholder='Enter postal code'
                        value={postal_code}
                        onChange={(e) => setPostalcode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                    <Form.Group controlId='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control

                            type='phone'
                            placeholder='+380981234567'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <p style={{color: 'red' }}>You will have to log in again after updating your details.</p>

                    <Button type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
            </Col>

             <Col md={9} style={{ position: 'absolute', left: '25%' }}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td><Link to={`/products/${order.product.slug}/`}>{order.product.title}</Link></td>
                                            <td>{order.createdAt}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? 'Yes' : 'No' }
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order.id}`}>
                                                    <Button className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
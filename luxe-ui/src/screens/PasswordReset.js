import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { passwordReset } from '../actions/userActions'

function PasswordResetScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [submitted, setSubmit] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(passwordReset(email))
        setSubmit(true);
    }

    if (submitted) {

        return <Redirect to='/' />
    }

    return (
        <FormContainer>
            <h1>Password Reset</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <p style={{color: 'red' }}>Please check your email after submitting this form and follow the instructions.</p>
                <Button type='submit' variant='primary'>
                    RESET
                </Button>
            </Form>

        </FormContainer>
    )
}

export default PasswordResetScreen;

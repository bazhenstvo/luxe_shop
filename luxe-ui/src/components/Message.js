import React from 'react'
import { Alert, Container } from 'react-bootstrap'

function Message({ variant, children }) {
    return (
        <Container>
        <Alert variant={variant} style={{position: 'absolute', left: '6%'}}>
            {children}
        </Alert>
        </Container>
    )
}

export default Message

import React from 'react'
import { Alert, Container } from 'react-bootstrap'

function Message({ variant, children }) {
    return (
        <Container>
        <Alert variant={variant} style={{position: 'relative'}}>
            {children}
        </Alert>
        </Container>
    )
}

export default Message

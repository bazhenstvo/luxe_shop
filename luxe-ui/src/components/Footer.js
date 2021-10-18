import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer>
                <Row>
                    <Col className="text-center py-1" style={{backgroundColor: 'black', color: "white", position:'fixed', left:0, bottom:0, right:0}}>Copyright &copy; Luxe Shop</Col>
                </Row>
        </footer>
    )
}

export default Footer

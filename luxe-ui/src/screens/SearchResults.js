import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import {Card, Button, Form} from 'react-bootstrap'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";
import { Row } from 'react-bootstrap'
import Message from "../components/Message";
import { Zoom } from 'react-preloaders2';

function SearchResults({match}) {

    const [products, setProducts] = useState([])
    const slug = match.params.slug
    const [currentPage, setCurrentPage] = useState(`${process.env.REACT_APP_API_ROOT}/v1/products/?search=${slug}`);
    const [prev, prevPage] = useState('')
    const [next, nextPage] = useState('')

    useEffect(() => {
        axios({
      method: 'GET',
      url: currentPage
    }).then(response=> {
        setProducts(response.data.results)
        prevPage(response.data.previous)
        nextPage(response.data.next)
        })
},[currentPage])

    const incrementPageNumber = () => setCurrentPage(next);
    const decrementPageNumber = () => setCurrentPage(prev);

    return (
        <div>
        <Row>
            <Zoom time={500} />
        {products.length === 0 ? (
            <div>
                <br/>
                    <Message variant='info'>
                        No products found.&nbsp;
                        <a href="/">Go Back</a>
                    </Message>
            </div>
                ) : (
            <Row md={4} className="g-4" style={{justifyContent: 'center'}}>
        {products.map(product => (
            <Card className="text-center" key={product.slug}>
                {product.productImages.slice(0,1).map(image => (
            <div key={image.id}>
                <Link className="nav-link" to={{pathname: `/products/${product.slug}/`, fromDashboard: false}}>
                    <Card.Img className="col-md-20" src={image.image} width="500px"/>
                </Link>
                <Card.Text style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        {product.productSizes.map(size => (
                            <div key={size.id}>
                                <strong>&nbsp;&nbsp;{size.size}</strong>
                            </div>))}
                </Card.Text>
                <Card.Text as="div">
                <strong>{product.title}</strong>
                </Card.Text>
                <Card.Text as="div">
                    <strong>${product.price}</strong>
                </Card.Text>
            </div>
                            ))}
        </Card>
        ))}
            </Row>
    )}
        </Row>
        {products.length === 0 ? '' : (
            <div style={{ display: "flex", justifyContent: 'center', marginTop: "2%"}}>
            <Button disabled={prev === null} variant='outline-dark' onClick={() => decrementPageNumber() }>Previous</Button>
            <Button disabled={next === null} variant='outline-dark' onClick={() => incrementPageNumber() }>Next</Button>
            </div> )}
        </div>);
}

export default SearchResults;

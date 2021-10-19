import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import {Card, Button, Form, CardGroup} from 'react-bootstrap'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, useHistory} from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import { Zoom } from 'react-preloaders2';

function AllProducts({}) {

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [size, setSize] = useState('')
    const [min_price, setMinprice] = useState('')
    const [max_price, setMaxprice] = useState('')
    const [currentPage, setCurrentPage] = useState(`${process.env.REACT_APP_API_ROOT}/v1/products/`);
    const [prev, prevPage] = useState('')
    const [next, nextPage] = useState('')

    let history = useHistory();

    const goFilter = (e) => {
		history.push({
			pathname: 'category=' + category + '&size=' + size + '&min_price=' + min_price + '&max_price=' + max_price,
		});
		window.location.reload();
	};

  useEffect(() => {
    axios({
      method: 'GET',
      url: currentPage
    }).then(response=> {
        setProducts(response.data.results)
        prevPage(response.data.previous)
        nextPage(response.data.next)
    })
  }, [currentPage])

    const incrementPageNumber = () => setCurrentPage(next);
    const decrementPageNumber = () => setCurrentPage(prev);


    return (
        <div>
        <Form onSubmit={goFilter}>
            <Form.Row style={{justifyContent: 'center', position:'relative', top: '10%'}}>
           <Form.Group controlId="formBasicSelect">
                <Form.Control
                  as="select"
                  value={category}
                  onChange={e => {setCategory(e.target.value)}}
                >
                    <option value="">Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='min_price'>
                    <Form.Control
                        type='min_price'
                        placeholder='Min price'
                        value={min_price}
                        onChange={(e) => setMinprice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='max_price'>
                    <Form.Control
                        type='max_price'
                        placeholder='Max price'
                        value={max_price}
                        onChange={(e) => setMaxprice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicSelect">
                <Form.Control
                  as="select"
                  value={size}
                  onChange={e => {setSize(e.target.value)}}
                >
                    <option value="">Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="3XL">3XL</option>
                    <option value="4XL">4XL</option>
                    <option value="5XL">5XL</option>
                </Form.Control>
            </Form.Group>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>
                <Button type='submit' variant='outline-dark' style={{position:'relative', top: '10%'}}>
                    Filter
                </Button>
                </div>
            </Form.Row>
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
        </Form>
        <div style={{ display: "flex", justifyContent: 'center', marginTop: "2%", marginBottom: '10%'}}>
        <Button disabled={prev === null} variant='outline-dark' onClick={() => decrementPageNumber() }>Previous</Button>
        <Button disabled={next === null} variant='outline-dark' onClick={() => incrementPageNumber() }>Next</Button>
        </div>
        </div>
    );
}

export default AllProducts;

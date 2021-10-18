import React, {useState, useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";
import {Card, Container, Row} from 'react-bootstrap'
import Message from "../components/Message";
import { Zoom } from 'react-preloaders2';

function CategoryDetail({match}) {

    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const slug = match.params.slug

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_ROOT}/v1/categories/${slug}/`
    }).then(response=> {
        console.log(response)
        setCategory(response.data)
        setProducts(response.data.products)
    })
  }, [slug])

    return (
        <Row>
            <Zoom time={500} />
        {products.length === 0 ? (
                    <Message variant='info'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        No products found. <Link to='/'>Go Back</Link>
                    </Message>
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

        </Row>);
}

export default CategoryDetail;

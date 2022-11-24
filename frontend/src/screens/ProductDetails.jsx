import React, { useEffect, useState } from 'react';
import {Row,Col,Button,ListGroup, Image, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetail } from '../actions/productActions';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';


const ProductDetails = ({history,match}) => {
  const [qty,setQty] = useState(1)
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetail)
  const {loading,product,error} = productDetails
    useEffect(()=>{
      dispatch(listProductDetail(match.params.id))
    },[dispatch,match])
      
    const addToCartHandle = () => {
      history.push(`/cart/${match.params.id}/?qty=${qty}`)
    }
  return (
    <>
    {
      loading ?
       <Loader/>
       : error 
       ? 
       <Message variant='danger'>
        {error}
       </Message>:
       <>
       <Link to="/" className='btn btn-light'>
        <i className='fas fa-arrow-left'></i>&nbsp;
        Go Back
      </Link>
      <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
            </ListGroupItem>
            <ListGroupItem>
              Price : $ {product.price}
            </ListGroupItem>
            <ListGroupItem>
              {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col>Stock : </Col>
                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
              </Row>
            </ListGroupItem>
            {
              product.countInStock > 0 && 
              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                    {
                      [...Array(product.countInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1}>
                        {x+1}
                      </option>
                      ))
                    }
                  </Form.Control>
                </Row>
              </ListGroupItem>
            }
            <ListGroupItem>
              <Button className='btn-block w-100' type='button' onClick={()=>addToCartHandle()}>Add to cart</Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
       </>

    }
    </>
  )
}

export default ProductDetails

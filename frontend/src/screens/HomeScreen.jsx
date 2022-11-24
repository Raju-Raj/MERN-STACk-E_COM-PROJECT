import React, { useEffect} from 'react';
import {Row,Col} from 'react-bootstrap'
import ProductScreen from './ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';

const HomeScreen = () => {
 
  const dispatch = useDispatch()
  const productlist = useSelector(state => state.productList)
  const {loading,error,products} = productlist
  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])
  return (
    <>
    {
      loading ?
      <Loader/>
      : error ? 
      <Message variant="danger">
        {error}
      </Message>:
      <Row>
        {
            products.map((item,index) => (
                <Col md={3} key={item._id}>
                <ProductScreen product={item}/>
                </Col>
            ))
        }
    </Row>
    }
    </>
  )
}

export default HomeScreen

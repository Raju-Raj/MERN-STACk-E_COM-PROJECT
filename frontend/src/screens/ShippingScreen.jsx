import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {saveShippingAddress} from '../actions/cartAction';
import FormContainer from '../components/shared/FormContainer';
import CheckoutStep from '../components/shared/CheckoutStep';

const ShippingScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode]= useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)
    

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment');
    } 

  return (
   <>
   <CheckoutStep step1 step2/>
    <FormContainer>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control type="text" placeholder="Enter PostalCode" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter Country" value={country} onChange={(e)=>setCountry(e.target.value)} required></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
   </>
  )
}

export default ShippingScreen

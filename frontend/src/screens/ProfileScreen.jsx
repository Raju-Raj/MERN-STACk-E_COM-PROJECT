import React,{ useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button,Row,Col, Table} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import Message from '../components/shared/Message';
import Loader from '../components/shared/Loader';
import {getUserDetails,updateUserProfile} from '../actions/userAction';
import FormContainer from '../components/shared/FormContainer';
import { listMyOrders } from '../actions/orderAction';
import {LinkContainer} from 'react-router-bootstrap';


const ProfileScreen = ({location,history}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('')

    

    const dispatch = useDispatch()
    const userDetails= useSelector(state => state.userDetails)
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,user} = userDetails
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector((state)=>state.orderListMy)
    const {loading:loadingMyOrders,orders,error:errorOrders} = orderListMy

    useEffect(()=>{
      if(!userInfo){
        history.push("/login")
      }else{
        if(!user.name){
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }else{
            setName(user.name)
            setEmail(user.email)
        }
      }
    },[history,userInfo,user,dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch
        dispatch(updateUserProfile({id:user._id,name,email,password}))
    }
  return (
    <>
   <Row>
    <Col md={4}>
    <FormContainer>
        <h1>Update Information</h1>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader/>}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="enter name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">Update</Button>
        </Form>
    </FormContainer>
    </Col>
    <Col md={8}>
        <h1>My Orders</h1>
        {
            loadingMyOrders ? <Loader/>
            :errorOrders ? <Message variant="danger">{errorOrders}</Message>
            :(
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order)=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10):(
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>{order.isDeleverd ? order.deleverdAt.substring(0,10):(
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            )
        }
    </Col>
   </Row>
    </>
  )
}

export default ProfileScreen;
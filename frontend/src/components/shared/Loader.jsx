import React from 'react';
import {Spinner} from 'react-bootstrap';

const Loader = () => {
  return (
    <>
      <Spinner animation="border" role="status" style={{height:'75px',width:'75px',display:'block',margin:'auto'}}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </>
  )
}

export default Loader

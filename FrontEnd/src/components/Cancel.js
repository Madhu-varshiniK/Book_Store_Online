import React from 'react'
import cancel from "../images/cancel.png"
import {Link} from "react-router-dom"
import './PaymentStatus.css'; 

const Cancel = () => {
  return (
    <div className='containerPayment'>
      <div className='contentPayment'>
        <div className='titlePayment'>Payment Failed</div>
        <div className='messagePayment'>Please try payment again in cart</div>
        <div className='image-container-Payment'>
          <img className='imagePayment' src={cancel} alt='' />
        </div>
        <div className='linkPayment'>
          <Link to='/'>BookVerse Home Page</Link>
        </div>
      </div>
    </div>
  )
};

export default Cancel;
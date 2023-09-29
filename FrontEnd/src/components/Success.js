import React from 'react';
import success from '../images/success.png';
import { Link } from 'react-router-dom';
import './PaymentStatus.css'; 


const Success = () => {
  return (
    <div className='containerPayment'>
      <div className='contentPayment'>
        <div className='titlePayment'>Payment successful</div>
        <div className='messagePayment'>Your order is in our system</div>
        <div className='image-container-Payment'>
          <img className='imagePayment' src={success} alt='' />
        </div>
        <div className='linkPayment'>
          <Link to='/'>BookVerse Home Page</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;

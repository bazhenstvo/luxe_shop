import React from 'react';
import { Link } from 'react-router-dom';
class SuccessPayment extends React.Component{
    render(){
        return (
        <div>
          <body style={{
        position: 'absolute', left: '40%', top: '40%',
        transform: 'translate(-30%, -50%)'
    }}>
            <h1>Thanks for your order!</h1>
            <p>
              We appreciate your business!
              If you have any questions, please
              <a href="mailto:luxe@shop.com">&nbsp;email us</a>.
            </p>
           <p><Link to="/">Go to Home </Link></p>
          </body>
        </div>
        )
    }
}
export default SuccessPayment;
import React from 'react';
import { Link } from 'react-router-dom';
class BadRequest extends React.Component{
    render(){
        return <div>
            <h1 style={{
        position: 'absolute', left: '40%', top: '40%',
        transform: 'translate(-30%, -50%)'
    }}>Oops, something went wrong...</h1>
            <h5 style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}><Link to="/">Go to Home </Link></h5>
          </div>;
    }
}
export default BadRequest;
import React from 'react';
import './errorMessage';
import img from './error.jpg'
   
const ErrorMessage = () => {
    return (
        // react фрагмент либо  Div
        <>
            <img src={img} alt='error' ></img>
            <span> Миша, даай по новой</span>
        </>
    )
}

export default ErrorMessage;
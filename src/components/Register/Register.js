import React from 'react';
import "./Register.scss"

export default class Register extends React.Component{
    render(){
        return(
            <div className='register-page'>
                <div className='register-box'>
                    <input type="text" placeholder="First Name"></input>
                    <input type="text" placeholder='Last Name'></input>
                    <input type="text" placeholder='Email'></input>
                    <input type="text" placeholder='Password'></input>
                    <input type="text" placeholder='Phone Number'></input>
                    <input type="text" placeholder='School'></input>
                    <input type="text" placeholder='District'></input>
                    
                    <button className='register-button'>Register Account</button>
                </div>
            </div>
        )
    };
};
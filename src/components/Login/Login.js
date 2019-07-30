import React from 'react';
import "./Login.scss"

export default class Login extends React.Component{
    render(){
        return(
            <div className='login-page'>
                <div className='login-box'>
                    <input type="text" placeholder="Email"></input>
                    <input type="password" placeholder='Password'></input>
                    <button className='login-button'>Login</button>
                    <button className='login-button'>Get Started</button>
                </div>
            </div>
        )
    };
};
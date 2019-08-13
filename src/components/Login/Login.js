import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import "./Login.scss"

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            email: '',
            password: '',
            loading: false
        }
        this.login = this.login.bind(this);
    }

    changeHandler(property, value){
        this.setState({
            [property]: value
        });
    };


    login(){
        this.setState({
            loading: true
        });
        axios.post('/api/login', {email: this.state.email, password: this.state.password})
        .then(res=> {
            this.props.setUser(res.data);
            localStorage.setItem("user", res.data.user_id)
            this.setState({
                email: '',
                password: '',
                loading: false
            });
            this.props.history.push('/profile')
        });
    };

    render(){

        const {email, password} = this.state;
        return(
                <div className='login-page'>
                    <div className='login-box'>
                        <h1 className="greeting">Sign In</h1>
                       <input className='input' type="text" placeholder="Email"
                        name='email'
                        value={email}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                        <input className='input' type="password" placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          }
                        />
                            <button className='login' onClick={this.login}>Login</button>
                            <p className="prompt">Not registered?</p>
                        <Link to="/register">
                            <button className='register'>Get Started</button>
                        </Link>
                    </div>
               </div>
        )
    };
};

function mapReduxStateToProps(reduxState){
    return reduxState;
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Login);
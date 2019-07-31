import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUser} from '../../redux/reducer';
import "./Register.scss";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            school: '',
            district: '',
            loading: false
        }
        this.register = this.register.bind(this);
    }

    changeHandler(property, value){
        this.setState({
            [property]: value
        })
    }

    register(){
        this.setState({
            loading:true
        })
        axios
        .post('/api/register', {email: this.state.email, password: this.state.password})
        .then(res=> {
            this.props.setUser(res.data);
        this.setState({
            user: null,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            school: '',
            district: '',
            loading: false
        })
        })
    }

    render(){
        const {email, lastName, firstName, password, phoneNumber, school, district} = this.state;
        return(
            <div className='register-page'>
                <div className='register-box'>
                    <input type="text" placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    />
                    <input type="text" placeholder='Last Name'
                    name="lastName"
                    value={lastName}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    />
                    <input type="text" placeholder='Email'
                    name="email"
                    value={email}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    />
                    <input type="text" placeholder='Password'
                    name="password"
                    value={password}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    />
                    <input type="text" placeholder='Phone Number'
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    />
                    <input type="text" placeholder='School'
                    name="school"
                    value={school}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    />
                    <input type="text" placeholder='District'
                    name="district"
                    value={district}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    />
                    
                    <button className='register-button' onClick={this.register}>Register Account</button>
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


export default connect(mapReduxStateToProps, mapDispatchToProps)(Register);
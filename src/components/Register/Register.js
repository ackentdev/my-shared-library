import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
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

    register(e){
        e.preventDefault(e);
        let newUserProfile = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            school: this.state.school,
            district: this.state.district,
        }
        this.setState({
            loading:true
        })
        axios
        .post('/api/register', newUserProfile)
        .then(res=> {
            this.props.setUser(res.data);
            localStorage.setItem("user", res.data.user_id)
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
        this.props.history.push('./profile')
    }

    render(){
        const {email, lastName, firstName, password, phoneNumber, school, district} = this.state;
        return(
            <body>
    <div class="container">
        <div class="row">
			<div class="col-md-5 mx-auto">
			<div id="first"></div>
            <div class="myform form ">
            <div class="logo mb-3">
                <div class="col-md-12 text-center">
                   <h1>Register</h1>
                </div>
           </div>
          <form action="" method="post" name="login">
                  <div class="form-group">
                     <input className="form-control" id="firstName" aria-describedby="emailHelp" type="email" placeholder="First Name"
                        name='firstName'
                        value={firstName}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="lastName" aria-describedby="emailHelp" type="email" placeholder="Last Name"
                        name='lastName'
                        value={lastName}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="email" aria-describedby="emailHelp" type="email" placeholder="Enter email"
                        name='email'
                        value={email}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" aria-describedby="emailHelp" type="password" placeholder='Enter Password'
                        name='password'
                        value={password}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          }
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="phoneNumber" aria-describedby="emailHelp" type="email" placeholder="Phone Number"
                        name='phoneNumber'
                        value={phoneNumber}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="school" aria-describedby="emailHelp" type="email" placeholder="Enter school"
                        name='school'
                        value={school}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="district" aria-describedby="emailHelp" type="email" placeholder="Enter district"
                        name='district'
                        value={district}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="col-md-12 text-center ">
                     <button type="submit" onClick={(e) => this.register(e)}class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                  </div>
                  
               </form>
       </div>
       </div>
       </div>
       </div>
       </body>
            
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

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

    directToRegister(){
        this.props.history.push('/register');
    }

    changeHandler(property, value){
        this.setState({
            [property]: value
        });
    };


    login(e){
        e.preventDefault()
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
            <body>
    <div class="container">
        <div class="row">
			<div class="col-md-5 mx-auto">
			<div id="first"></div>
            <div class="myform form ">
            <div class="logo mb-3">
                <div class="col-md-12 text-center">
                   <h1>Login</h1>
                </div>
           </div>
          <form action="" method="post" name="login">
                  <div class="form-group">
                     <label for="exampleInputEmail1">Email address</label>
                     <input className="form-control" id="email" aria-describedby="emailHelp" type="email" placeholder="Enter email"
                        name='email'
                        value={email}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <label for="exampleInputEmail1">Password</label>
                     <input className="form-control" aria-describedby="emailHelp" type="password" placeholder='Enter Password'
                        name='password'
                        value={password}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          }
                        />
                  </div>
                  <div class="col-md-12 text-center ">
                     <button type="submit" onClick={(e) => this.login(e)}class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                  </div>
                  <div class="col-md-12 ">
                     <div class="login-or">
                        <hr class="hr-or" />
                        <span class="span-or">or</span>
                     </div>
                  </div>
                  <div class="col-md-12 mb-3">
                     <p class="text-center">
                        <button onClick={() => this.directToRegister()} class="google btn mybtn"><i class="fa">
                        </i> Create Account
                        </button>
                     </p>
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

export default connect(mapReduxStateToProps, mapDispatchToProps)(Login);

// original code
// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { setUser } from '../../redux/reducer';
// import "./Login.scss"

// class Login extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             user: null,
//             email: '',
//             password: '',
//             loading: false
//         }
//         this.login = this.login.bind(this);
//     }

//     changeHandler(property, value){
//         this.setState({
//             [property]: value
//         });
//     };


//     login(){
//         this.setState({
//             loading: true
//         });
//         axios.post('/api/login', {email: this.state.email, password: this.state.password})
//         .then(res=> {
//             this.props.setUser(res.data);
//             localStorage.setItem("user", res.data.user_id)
//             this.setState({
//                 email: '',
//                 password: '',
//                 loading: false
//             });
//             this.props.history.push('/profile')
//         });
//     };

//     render(){

//         const {email, password} = this.state;
//         return(
//                 <div className='login-page'>
//                     <div className='login-box'>
//                         <h1 className="greeting">Sign In</h1>
                    //    <input className='input' type="text" placeholder="Email"
                    //     name='email'
                    //     value={email}
                    //     onChange={e =>
                    //         this.changeHandler(e.target.name, e.target.value)
                    //       } 
                    //     />
                        // <input className='input' type="password" placeholder='Password'
                        // name='password'
                        // value={password}
                        // onChange={e =>
                        //     this.changeHandler(e.target.name, e.target.value)
                        //   }
                        // />
//                             <button className='login' onClick={this.login}>Login</button>
//                             <p className="prompt">Not registered?</p>
//                         <Link to="/register">
//                             <button className='register'>Get Started</button>
//                         </Link>
//                     </div>
//                </div>
//         )
//     };
// };

// function mapReduxStateToProps(reduxState){
//     return reduxState;
// }

// const mapDispatchToProps = {
//     setUser
// }

// export default connect(mapReduxStateToProps, mapDispatchToProps)(Login);
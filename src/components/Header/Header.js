import React, {Component} from 'react';
import './Header.scss';
import {NavLink, Link} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';


class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null
        }
        this.logout=this.logout.bind(this);
        this.userSession=this.userSession.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    componentDidMount() {
        this.userSession();
    }

    logout() {
        axios.get('/api/logout')
        .then(() => {
            this.props.setUser({});
        })
        .catch(err => console.log(err));
    }

    userSession() {
        axios.get('/api/userSession')
        .then((res) => {
            this.props.setUser(res.data);
        })
        .catch(err => console.log(err));
    }

    getProfile(){
        axios.get('/api/userSession', {user_id : this.props.user.user_id})
        .then((res) => {
            this.props.setUser(res.data);
        })
        .catch(err => console.log(err));
    }

    render(){
        console.log("logged in user: ", this.props.user)
        return <div>
            <header>
        <Link exact to="/">
        <img alt='header-logo' className='header-logo' src={process.env.PUBLIC_URL + '/music-library.png'}></img>
        </Link>
        <div className='navigation'>
          {/* <NavLink exact to='/' className='navigation-link' activeClassName='active'>Home</NavLink> */}
          <NavLink exact to='/profile' className='navigation-link' activeClassName='active'>Profile</NavLink>
          <NavLink exact to='/library' className='navigation-link' activeClassName='active'>Library</NavLink>
          {/* <NavLink exact to='/library/search' className='navigation-link' activeClassName='active'>Search</NavLink> */}
          <Link to="/">
            <button onClick={this.logout}>Logout</button>
            </Link>
        </div>
      </header>
        </div>
    };
};

function mapReduxStateToProps(reduxState){
    return reduxState;
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Header);
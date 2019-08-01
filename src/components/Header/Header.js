import React, {Component} from 'react';
import './Header.scss';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';


class Header extends Component {
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this);
        this.userSession=this.userSession.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    componentDidMount() {
        this.userSession();
        console.log("component mounted:", this.props.user);
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
        console.log(this.props.user);
        return <div>
            <header>
        <img alt='header-logo' className='header-logo' src={process.env.PUBLIC_URL + '/music-library.png'}></img>
        <div className='navigation'>
          <NavLink exact to='/' className='navigation-link' activeClassName='active'>Home</NavLink>
          <NavLink exact to='/profile' className='navigation-link' activeClassName='active'>Profile</NavLink>
          <NavLink exact to='/library' className='navigation-link' activeClassName='active'>Library</NavLink>
          <NavLink exact to='/library/search' className='navigation-link' activeClassName='active'>Search</NavLink>
          <button onClick={this.logout}>Logout</button>
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
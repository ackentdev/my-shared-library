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
            user: null,
            toggleMenu: false
        }
        this.logout=this.logout.bind(this);
        this.userSession=this.userSession.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.toggleMenuFunc = this.toggleMenuFunc.bind(this);
    }

    toggleMenuFunc(){
        this.setState((prevState) => {
            return {
                toggleMenu: !prevState.toggleMenu
            }
        })
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
                <Link to="/">
                <img alt='header-logo' className='header-logo' src={process.env.PUBLIC_URL + '/music-folder.svg'}></img>
                </Link>
                <h1 className={this.props.user ? 'title' : "not-logged-in"}>My Shared Library</h1>
                <div className={this.props.user ? "navigation non-mobile" : "hide"}>
                    <NavLink exact to='/profile' className='navigation-link' activeClassName='active'>Profile</NavLink>
                    <NavLink exact to='/library' className='navigation-link' activeClassName='active'>Library</NavLink>
                    <NavLink exact to='/' className='navigation-link'  onClick={this.logout}>Logout</NavLink>
                </div>
                <button className="btn" onClick={this.toggleMenuFunc}>
                    <i className="fa fa-bars"></i>
                </button>
            </header>
            <div className={this.state.toggleMenu ? "navigation mobile-menu show" : "navigation mobile-menu"}>
                    <NavLink exact to='/profile' className='navigation-link' activeClassName='active'>Profile</NavLink>
                    <NavLink exact to='/library' className='navigation-link' activeClassName='active'>Library</NavLink>
                    <NavLink exact to='/' className='navigation-link'  onClick={this.logout}>Logout</NavLink>
                </div>
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
import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { setUser } from '../../redux/reducer';
import "./Profile.scss"

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editing: false,
            loading: true
        }
    }
 
    componentDidMount(){
        this.setState({
            loading: false
        })
    }

    editingMode(){
        this.setState({
            editing: true
        })
    }

    render(){
        const {firstName, lastName, phoneNumber, picture, school, district, email} = this.props.user
        if(!this.state.editing){
        return(
            <div>
            <div className="profile-info">
                <img className="profile-picture" alt='' src={picture}/>
                <h1>{firstName} {lastName}</h1>
                <h2>
                    <img alt="email-icon" src={process.env.PUBLIC_URL + '/email-icon.svg'}/> {email}, 
                    <img alt="phone-icon" src={process.env.PUBLIC_URL + '/phone-icon.svg'}/>{phoneNumber}
                </h2>
                <h6>{school}</h6>
                <h4>{district}</h4>
                <button onClick={() => this.editingMode()}>Update User Info</button>
            </div>
            </div>
        )} else {
            return(
                <div>
                    <img className="profile-picture" alt='' src={picture}/>
                    <div>
                        <input type="text" placeholder={firstName} />
                        <input type="text" placeholder={lastName} />
                    </div>
                    <div>
                        <img alt="email-icon" src={process.env.PUBLIC_URL + '/email-icon.svg'}/>
                        <input type="text" placeholder={email}/>
                        <img alt="phone-icon" src={process.env.PUBLIC_URL + '/phone-icon.svg'}/>
                        <input type="text" placeholder={phoneNumber}/>
                    </div>
                    <input type="text" placeholder={school}/>
                    <input type="text" placeholder={district}/>
                    <button onClick={() => {this.setState({editing: false})}}>Cancel</button>
                    <button>Confirm Changes</button>
                </div>
            )
        }
    };
};

function mapReduxStateToProps(reduxState){
    return reduxState;
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Profile);
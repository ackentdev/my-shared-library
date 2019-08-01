import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { setUser } from '../../redux/reducer';

class Profile extends React.Component{
 
    render(){
        const {firstName, lastName} = this.props.user
        return(
            <div>
            {!this.props.user.firstName ? 
            <div></div> :
            <div>
                This is {firstName} {lastName}'s profile!
            </div>}
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

export default connect(mapReduxStateToProps, mapDispatchToProps)(Profile);
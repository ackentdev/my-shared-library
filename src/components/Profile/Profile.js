import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { setUser } from '../../redux/reducer';
import "./Profile.scss"

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editfirstName: props.user && props.user.firstName,
            editlastName: props.user && props.user.lastName,
            editemail: props.user && props.user.email ,
            editphoneNumber: props.user && props.user.phoneNumber,
            editschool: props.user && props.user.school,
            editdistrict: props.user && props.user.district,
            firstName: props.user && props.user.firstName,
            lastName: props.user && props.user.lastName,
            email: props.user && props.user.email,
            phoneNumber: props.user && props.user.phoneNumber,
            school: props.user && props.user.school,
            district: props.user && props.user.district,
            picture: props.user && props.user.picture,
            user_id: props.user && props.user.user_id,
            concerts: [],
            editing: false,
            loading: true
        }
        this.getConcerts = this.getConcerts.bind(this);
    }
    
    componentDidUpdate(){
     console.log("updated!")
    }

    componentDidMount(){
        console.log("mounted!")
        this.setState({
            loading: false
        })
        this.getConcerts();
    };

    updateProfile(){
        const {user_id} = this.props.user;
        const updatedProfile = {
            editfirstName: this.state.editfirstName,
            editlastName: this.state.editlastName,
            editemail: this.state.editemail,
            editphoneNumber: this.state.editphoneNumber,
            editschool: this.state.editschool,
            editdistrict: this.state.editdistrict
        }
        axios.put(`/api/profile/${user_id}`, updatedProfile)
        .then(res => {
            this.props.setUser(res.data);
            this.setState({
                editing: false
            })
        }).catch(err => console.log(err))
    };

    changeHandler(property, value){
        this.setState({
            [property]:value
        })
    };

    getConcerts(){
        axios.get(`/api/profile/concerts/${this.state.user_id}`)
        .then( res => {
            this.setState({
                concerts: res.data
            })
        })
    }

    editingMode(){
        this.setState({
            editing: true
        })
    };
    
    render(){
        console.log(this.state.concerts)
        const {firstName, lastName, phoneNumber, picture, school, district, email} = this.state
        const {editfirstName, editlastName, editphoneNumber, editschool, editdistrict, editemail} = this.state;
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
            <div className="concerts">

            </div>
            </div>
        )} else {
            return(
                <div>
                    <img className="profile-picture" alt='' src={picture}/>
                    <div>
                        <input type="text" placeholder={firstName}
                        name="editfirstName"
                        value={editfirstName}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          }
                        ></input>
                        <input type="text" placeholder={lastName}
                        name="editlastName"
                        value={editlastName}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          }
                        ></input>
                    </div>
                    <div>
                        <img alt="email-icon" src={process.env.PUBLIC_URL + '/email-icon.svg'}/>
                        <input type="text" placeholder={email}
                        name="editemail"
                        value={editemail}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          }
                        ></input>
                        <img alt="phone-icon" src={process.env.PUBLIC_URL + '/phone-icon.svg'}/>
                        <input type="text" placeholder={phoneNumber}
                        name="editphoneNumber"
                        value={editphoneNumber}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          }
                        ></input>
                    </div>
                    <input type="text" placeholder={school}
                    name="editschool"
                    value={editschool}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    ></input>
                    <input type="text" placeholder={district}
                    name="editdistrict"
                    value={editdistrict}
                    onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    ></input>
                    <button onClick={() => {this.setState({editing: false})}}>Cancel</button>
                    <button onClick={() => this.updateProfile()}>Confirm Changes</button>
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
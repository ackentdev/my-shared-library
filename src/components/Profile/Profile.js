import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { setUser } from '../../redux/reducer';
import Concerts from '../Concerts/Concerts'
import "./Profile.scss"

class Profile extends React.Component{
    constructor(props){
        super(props);
        const user_id = parseInt(localStorage.getItem("user"));
        this.state = {
            editfirstName: "",
            editlastName: "",
            editemail: "" ,
            editphoneNumber: "",
            editschool: "",
            editdistrict: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            school: "",
            district: "",
            picture: "",
            user_id: user_id,
            concerts: [],
            editing: false,
            loading: true
        }
        this.getConcerts = this.getConcerts.bind(this);
        this.getProfileInfo = this.getProfileInfo.bind(this);
    }


    componentDidMount(){
        this.setState({
            loading: false
        })
        this.getConcerts();
        this.getProfileInfo(this.state.user_id);
    };

    updateProfile(){
        const user_id = parseInt(localStorage.getItem("user"));
        console.log(user_id);
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

    getProfileInfo(id){
        axios.get(`/api/profile/${id}`)
        .then( res => {
            console.log(res.data);
            this.setState({
                editfirstName: res.data.first_name,
                editlastName: res.data.last_name,
                editemail: res.data.email ,
                editphoneNumber: res.data.phone,
                editschool: res.data.school,
                editdistrict: res.data.district,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                email: res.data.email,
                phoneNumber: res.data.phone,
                school: res.data.school,
                district: res.data.district,
                picture: res.data.picture,
            })
        })
    }

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
        const {firstName, lastName, phoneNumber, picture, school, district, email, concerts, user_id} = this.state
        const {editfirstName, editlastName, editphoneNumber, editschool, editdistrict, editemail} = this.state;
        // const [concertNames] = this.state.concerts.map( e => {
        //         let arr =[]
        //         if (!arr.includes(e.concert_name)){
        //             arr.push(e.concert_name)
        //         }
        //         return arr;
        // })
        // console.log("concert names:", concertNames)


        let mappedConcertSongs = []
        this.state.concerts.forEach(song => {
        let index = mappedConcertSongs.findIndex(concert => 
        song.concert_name === concert.concertName)
  
        if (index === -1) {
        mappedConcertSongs.push({
        concertName : song.concert_name,
        concert_id : song.concert_id,
        songs: [ { songName: song.song_name, catalogId: song.catalog_id }],
        date: song.date
            })
        }
        else {
            mappedConcertSongs[index].songs.push({ songName: song.song_name, catalogId: song.catalog_id })
        }
        });

        let concertInfo = mappedConcertSongs.map( concert => {
            
                return(
                    <div key={concert.concert_id}>
                        <h1>
                            <span>{concert.concertName}</span>
                            <span> {concert.date}</span>
                        </h1>
                        <Concerts concert={concert} />
                    </div>
                )  
        })

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
                <h1>Concerts</h1>
                {concertInfo}
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
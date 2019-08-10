import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import Search from '../Library/Search/Search';
import "./AddConcert.scss";

class AddConcert extends Component{
    constructor(props){
        super(props);
        this.state = {
            concertName: '',
            concertDate: '',
            songId: [],
            added: false,
        }
    }

    changeHandler(property, value){
        this.setState({
            [property]: value
        })
    }



    addConcert(e){
        e.preventDefault()
        for (let i = 0; i<this.state.songID.length; i++){
        axios.post(`/api/profile/concerts/${this.props.user_id}`, {concertName: this.state.concertName, concertDate: this.state.songId[i]})
        .then( res => {
            console.log(res)
        })
    }
    this.setState({
        added: true
    })
}

    render(){
        console.log("state: ", this.state)
        const {concertName, concertDate} = this.state;
        return(
            <div>
                <form action="" method="post" className="add-concert">
                    <div className="concert-input-static">
                        <label htmlFor="concertName">Name: </label>
                        <input type="text" name="concertName" value={concertName} id="concertName"
                        onChange={e =>this.changeHandler(e.target.name, e.target.value)} />
                    </div>
                    <div className="concert-input-static">
                        <label htmlFor="concertDate">Date: </label>
                        <input type="text" name="concertDate" value={concertDate} id="concertDate" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                    </div>
                    <div className="concert-input-dynamic">
                        <label htmlFor="placeholder">placeholder: </label>
                        <input type="text" name="placeholder" value="placeholder" id="placeholder" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <Search />
                    <div className="temp-concert">
                        <h1>Concert Preview</h1>
                        <h1>{concertName}, {concertDate}</h1>
                        
                    </div>
                    <div className="song-input">
                         
                        <button type="submit" value="Add Song" onClick={(e) => this.addConcert(e)}>Add Concert</button>
                        
                    </div>
                </form>
            </div>
        )
    }
}

function mapReduxStateToProps(reduxState){
    return reduxState;
}

const mapDispatchToProps = {
    setUser
}


export default connect(mapReduxStateToProps, mapDispatchToProps)(AddConcert);
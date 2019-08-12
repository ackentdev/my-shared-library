import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import Song from '../Library/Song/Song';
import "./AddConcert.scss";

class AddConcert extends Component{
    constructor(props){
        super(props);
        const userID = parseInt(localStorage.getItem("user"))
        this.state = {
            searchColumn: 'song_name',
            typedSearch: '',
            results: [],
            concertName: '',
            concertDate: '',
            songList: [],
            userID: userID,
            added: false,
        }
    }

    changeHandler(property, value){
        this.setState({
            [property]: value
        })
    }

    addSongToConcert(e, id){
        e.preventDefault();
        this.setState({
            songList: [...this.state.songList, id]
        })
    }

    findResults(e){
        e.preventDefault();
        const inquiry = {
            searchColumn: this.state.searchColumn,
            typedSearch: this.state.typedSearch.toLowerCase()
        }
        axios.post(`/api/library/search/${this.props.user.user_id}`, inquiry)
        .then(res => {
            console.log(res);
            this.setState({
                searchColumn: 'song_name',
                typedSearch: '',
                results: [...res.data]
            })
        }).catch(err => console.log(err));
    }

    addConcert(e){
        e.preventDefault()
        for (let i = 0; i<this.state.songList.length; i++){
        axios.post(`/api/profile/concerts/${this.state.userID}`, {concertName: this.state.concertName, concertDate: this.state.concertDate, songId: this.state.songList[i].song_id})
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
        const mappedResults = this.state.results.map(song => {
            return <div key={song.song_id}>
                <Song song={song}/>
                <button onClick={(e) => this.addSongToConcert(e, song)}>Add To Concert</button>
            </div>
        })
        const mappedSongInfo = this.state.songList.map(song => {
            return <div className="temp-song-info" key={song.song_id}>
                <span className="song-name">{song.song_name} </span>
                <span className="voicing">{song.voicing} </span>
                <span className="catalog-id">{song.catalog_id} </span>
            </div>
        })
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
                    <div className="search">
                        <select name="searchColumn" onChange={ e => this.changeHandler(e.target.name, e.target.value)}>
                            <option name="searchColumn" value="song_name">Title</option>
                            <option name="searchColumn" value="voicing">Voicing</option>
                            <option name="searchColumn" value="genre">Genre</option>
                            <option name="searchColumn" value="composer">Composer</option>
                        </select>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            name="typedSearch" 
                            value={this.state.typedSearch}
                            onChange={ e => this.changeHandler(e.target.name, e.target.value)}>
                </input>
                <button onClick={(e) => this.findResults(e)}>Search</button>
                <div>
                    {mappedResults}
                </div>
            </div>
                    <div className="temp-concert">
                        <h1>Concert Preview</h1>
                        <h1>{concertName}, {concertDate}</h1>
                        {mappedSongInfo}
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
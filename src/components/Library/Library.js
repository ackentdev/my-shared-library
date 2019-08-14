import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import Song from "./Song/Song";
import Search from "./Search/Search";
import './Library.scss';
import axios from 'axios';

class Library extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            library: []
        }
        this.getLibrary = this.getLibrary.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
    }

    componentDidMount(){
        this.getLibrary()
    }

    getLibrary(){
        axios.get(`/api/library/${parseInt(localStorage.getItem("user"))}`)
        .then(res => {
            this.setState({
                library: res.data
            })
        }).catch(err => console.log(err))
    };

    deleteSong(param1, param2){
        console.log("userId", param2)
        console.log("clicked button")
        const song_id = param1;
        const user_id = param2;
        axios.delete(`/api/library?song_id=${song_id}&user_id=${user_id}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                library: res.data
            })
        })
    }
    

    render(){
        const mappedLibrary = this.state.library.map((song,i) => {
            return (
            <div className={i % 2 === 0 ? "songs even" : "songs odd"}>
                <Song key={song.song_id} song={song}/>
                <button onClick={() => this.deleteSong(song.song_id, this.props.user.user_id)}>Delete</button>
            </div>)
        })
        console.log(this.state);
        return(
            <div className='library'>
                <div className="buttons">
                    <img alt='add-icon' src={process.env.PUBLIC_URL + '/add-icon.svg'}/>
                    <Link to="/library/add_song">
                        <button>Add Song</button>
                    </Link>
                    <Link to="/library/search">
                        <button>Search</button>
                    </Link>
                </div>
                {mappedLibrary}
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

export default connect(mapReduxStateToProps, mapDispatchToProps)(Library);
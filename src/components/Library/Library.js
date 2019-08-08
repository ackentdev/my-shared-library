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
        axios.get(`/api/library/${this.props.user.user_id}`)
        .then(res => {
            this.setState({
                library: res.data
            })
        }).catch(err => console.log(err))
    };

    deleteSong(song_id, user_id){
        console.log("we did it!");
        axios.delete(`/api/libary?song_id=${song_id}&${user_id}`)
        .then(res => {
            this.setState({
                library: res.data
            })
        })
    }
    

    render(){
        const mappedLibrary = this.state.library.map(song => {
            return (<div>
                <Song key={song.song_id} song={song}/>
                <button onClick={this.deleteSong(song.song_id, this.props.user.user_id)}>Delete</button>
            </div>)
        })
        console.log(this.state);
        return(
            <div>
                <div>
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
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import Song from "./Song/Song";
import './Library.scss';
import axios from 'axios';

class Library extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            library: []
        }
        this.getLibrary = this.getLibrary.bind(this);
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
    

    render(){
        const mappedLibrary = this.state.library.map(song => {
            return <div>
                <Song song={song}/>
            </div>
        })
        console.log(this.state);
        return(
            <div>
                {mappedLibrary}
                <div>
                    <img alt='add-icon' src={process.env.PUBLIC_URL + '/add-icon.svg'}/>
                    <Link to="/library/add_song">
                        <button>Add Song</button>
                    </Link>
                </div>
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
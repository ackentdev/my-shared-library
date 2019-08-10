import React from 'react';
import {connect} from 'react-redux';
import {setUser} from '../../../redux/reducer';
import axios from 'axios';
import Song from '../Song/Song';
import "./Search.scss";

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchColumn: 'song_name',
            typedSearch: '',
            results: [],
        }
        this.findResults = this.findResults.bind(this);
    }

    changeHandler(property, value){
        this.setState({
            [property]: value
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

    render(){
        console.log(this.state);
        const mappedResults = this.state.results.map(song => {
            return <div>
                <Song song={song}/>
            </div>
        })
        return(
            <div>
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
        )
    };
};

function mapReduxStateToProps(reduxState){
    return reduxState;
}

const mapDispatchToProps = {
    setUser
}


export default connect(mapReduxStateToProps, mapDispatchToProps)(Search);
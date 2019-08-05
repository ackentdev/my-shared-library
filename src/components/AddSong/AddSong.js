import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import { Link } from 'react-router-dom'
import "./AddSong.scss";

class AddSong extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            voicing: '', 
            genre: '',
            catalogID: '',
            composer: '',
            publisher: '',
            publisherID: '',
            accompaniment: '',
            notes: '',
            loading: false
        }
    }

    changeHandler(property, value){
        this.setState({
            [property]: value
        })
    }

    addToLibrary(e){
        e.preventDefault()
        let addedSong = {
            title: this.state.title,
            voicing: this.state.voicing,
            genre: this.state.genre, 
            catalogID: this.state.catalogID,
            composer: this.state.composer,
            publisher: this.state.publisher,
            publisherID: this.state.publisherID,
            accompaniment: this.state.accompaniment,
            notes: this.state.notes,
            user_id: this.props.user.user_id
        }

        axios.post('/api/library', addedSong)
        .then( res => {
            console.log(res)
            this.setState({
                title: '',
                voicing: '', 
                genre: '',
                catalogID: '',
                composer: '',
                publisher: '',
                publisherID: '',
                accompaniment: '',
                notes: ''
            })
        })
    }

    render(){
        console.log(this.props.user.user_id)
        const {title, voicing, genre, catalogID, composer, publisher, publisherID, accompaniment, notes } = this.state;
        return(
            <div>
                <form action="" method="post" className="add-song">
                    <div className="song-input">
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" value={title} id="title"
                        onChange={e =>this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <label htmlFor="voicing">Voicing: </label>
                        <input type="text" name="voicing" value={voicing} id="voicing" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <label htmlFor="genre">Genre: </label>
                        <input type="text" name="genre" value={genre} id="genre" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <label htmlFor="catalog-id">Catalog ID: </label>
                        <input type="text" name="catalogID" value={catalogID} id="catalog-id" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <label htmlFor="composer">Composer: </label>
                        <input type="text" name="composer" value={composer} id="composer" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <label htmlFor="publisher">Publisher: </label>
                        <input type="text" name="publisher" value={publisher} id="publisher" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <label htmlFor="publisher-id">Publisher ID: </label>
                        <input type="text" name="publisherID" value={publisherID} id="publisher-id" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <label htmlFor="accompaniment">Accompaniment: </label>
                        <input type="text" name="accompaniment" value={accompaniment} id="accompaniment" 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <label htmlFor="notes">Notes: </label>
                        <input type="text" name="notes" id="notes" value={notes} 
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
                    </div>
                    <div className="song-input">
                        <Link to="/library">
                        <button type="submit" value="Add Song" onClick={(e) => this.addToLibrary(e)}>Add Song</button>
                        </Link>
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


export default connect(mapReduxStateToProps, mapDispatchToProps)(AddSong);
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
        this.props.history.push('/library')
    }

    render(){
        const {title, voicing, genre, catalogID, composer, publisher, publisherID, accompaniment, notes } = this.state;
        return(
            <body>
    <div class="container">
        <div class="row">
			<div class="col-md-5 mx-auto">
			<div id="first"></div>
            <div class="myform form ">
            <div class="logo mb-3">
                <div class="col-md-12 text-center">
                   <h1>Add Song</h1>
                </div>
           </div>
          <form action="" method="post" name="login">
                  <div class="form-group">
                     <input className="form-control" id="title" type="title" placeholder="Enter title"
                        name='title'
                        value={title}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="voicing" type="voicing" placeholder="Enter voicing"
                        name='voicing'
                        value={voicing}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="genre" type="genre" placeholder="Enter genre"
                        name='genre'
                        value={genre}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="catalogID" type="catalogID" placeholder="Enter catalogID"
                        name='catalogID'
                        value={catalogID}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="composer" type="composer" placeholder="Enter composer"
                        name='composer'
                        value={composer}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="publisher" type="publisher" placeholder="Enter publisher"
                        name='publisher'
                        value={publisher}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="publisherID" type="publisherID" placeholder="Enter publisherID"
                        name='publisherID'
                        value={publisherID}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="accompaniment" type="accompaniment" placeholder="Enter accompaniment"
                        name='accompaniment'
                        value={accompaniment}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="form-group">
                     <input className="form-control" id="notes" type="notes" placeholder="Enter notes"
                        name='notes'
                        value={notes}
                        onChange={e =>
                            this.changeHandler(e.target.name, e.target.value)
                          } 
                        />
                  </div>
                  <div class="col-md-12 text-center ">
                     <button type="submit" value="Add Song" onClick={(e) => this.addToLibrary(e)} class="google btn mybtn">Add Song</button>
                  </div>
               </form>
       </div>
       </div>
       </div>
       </div>
       </body>
            // <div>
            //     <form action="" method="post" className="add-song">
            //         <div className="song-input">
            //             <label htmlFor="title">Title: </label>
            //             <input type="text" name="title" value={title} id="title"
            //             onChange={e =>this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <label htmlFor="voicing">Voicing: </label>
            //             <input type="text" name="voicing" value={voicing} id="voicing" 
            //             onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <label htmlFor="genre">Genre: </label>
            //             <input type="text" name="genre" value={genre} id="genre" 
            //             onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <label htmlFor="catalog-id">Catalog ID: </label>
            //             <input type="text" name="catalogID" value={catalogID} id="catalog-id" 
            //             onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <label htmlFor="composer">Composer: </label>
            //             <input type="text" name="composer" value={composer} id="composer" 
            //             onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <label htmlFor="publisher">Publisher: </label>
            //             <input type="text" name="publisher" value={publisher} id="publisher" 
            //             onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <label htmlFor="publisher-id">Publisher ID: </label>
            //             <input type="text" name="publisherID" value={publisherID} id="publisher-id" 
            //             onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <label htmlFor="accompaniment">Accompaniment: </label>
            //             <input type="text" name="accompaniment" value={accompaniment} id="accompaniment" 
            //             onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <label htmlFor="notes">Notes: </label>
            //             <input type="text" name="notes" id="notes" value={notes} 
            //             onChange={e => this.changeHandler(e.target.name, e.target.value)}required />
            //         </div>
            //         <div className="song-input">
            //             <Link to="/library">
            //             <button type="submit" value="Add Song" onClick={(e) => this.addToLibrary(e)}>Add Song</button>
            //             </Link>
            //         </div>
            //     </form>
            // </div>
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
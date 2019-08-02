import React from 'react';
import {Link} from 'react-router-dom';

class Library extends React.Component{
    render(){
        return(
            <div>
                This is where the Library will go
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

export default Library;
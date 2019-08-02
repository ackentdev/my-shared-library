import React, {Component} from 'react';

class AddSong extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }

    render(){
        return(
            <div>
                <form action="" method="post" class="add-song">
                    <div class="">

                    </div>

                </form>
            </div>
        )
    }
}

export default AddSong;
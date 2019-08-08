import React from 'react';

export default class Song extends React.Component{
    constructor(props){
        super(props);
        // this.deleteSong = this.deleteSong.bind(this);
    }
    render(){
        const {title, voicing, genre, catalog_id, composer, publisher, publisher_id, accompaniment, notes, song_id} = this.props.song;
    return(
        <div>
            <span>Title: {title}</span>
            <span> Voicing: {voicing}</span>
            <span> Genre: {genre}</span>
            <span> Catalog: {catalog_id}</span>
            <span> Composer: {composer}</span>
            <span> Publisher: {publisher}</span>
            <span> Publisher ID: {publisher_id}</span>
            <span> Accompaniment: {accompaniment}</span>
            <span> Notes: {notes}</span>
            <button>Delete</button>
        </div>
    )}
}
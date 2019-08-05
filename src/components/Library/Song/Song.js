import React from 'react';

export default function Song(props){
    return(
        <div>
            <span>{props.song.title}</span>
            <span>{props.song.voicing}</span>
            <span>{props.song.genre}</span>
            <span>{props.song.catalog_id}</span>
            <span>{props.song.composer}</span>
            <span>{props.song.publisher}</span>
            <span>{props.song.publisher_id}</span>
            <span>{props.song.accompaniment}</span>
            <span>{props.song.notes}</span>
        </div>
)}
import React from 'react';

export default function Song(props){
    return(
        <ul key={props.song.song_id}>
            <li> Title: {props.song.song_name}</li>
            <li> Voicing: {props.song.voicing}</li>
            <li> Genre: {props.song.genre}</li>
            <li> Catalog: {props.song.catalog_id}</li>
            <li> Composer: {props.song.composer}</li>
            <li> Publisher: {props.song.publisher}</li>
            <li> Publisher ID: {props.song.publisher_id}</li>
            <li> Accompaniment: {props.song.accompaniment}</li>
            <li> Notes: {props.song.notes}</li>
        </ul>
    )
}
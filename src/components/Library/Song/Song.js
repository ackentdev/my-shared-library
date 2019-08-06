import React from 'react';

export default function Song(props){
    return(
        <div>
            <span>Title: {props.song.title}</span>
            <span> Voicing: {props.song.voicing}</span>
            <span> Genre: {props.song.genre}</span>
            <span> Catalog: {props.song.catalog_id}</span>
            <span> Composer: {props.song.composer}</span>
            <span> Publisher: {props.song.publisher}</span>
            <span> Publisher ID: {props.song.publisher_id}</span>
            <span> Accompaniment: {props.song.accompaniment}</span>
            <span> Notes: {props.song.notes}</span>
        </div>
)}
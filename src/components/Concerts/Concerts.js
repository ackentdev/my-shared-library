import React from 'react';
import "./Concerts.scss"

export default function Concerts(props){
    const concertDetails = props.concert.songs.map(song => {
        return (
            <ul className="song-list">
                <li className="song-details"> 
                     <span>Title: {song.songName}, </span>
                     <span>Catalog ID: {song.catalogId}</span>
                </li>
            </ul>
        )
    })
    return(
        <div > 
            {concertDetails}
        </div>
    )
}
import React from 'react';
import "./Concerts.scss"

export default function Concerts(props){
    const concertDetails = props.concert.songs.map((song, i) => {
        return (
            <ul className="song-list">
                <li className={i % 2 === 0 ? "song-details even" : "song-details odd"}> 
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
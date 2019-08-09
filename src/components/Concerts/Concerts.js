import React from 'react';

export default function Concerts(props){
    const concertDetails = props.concert.songs.map(song => {
        return (
            <ul>
                <li>
                     <span>Title: {song.songName}, </span>
                     <span>Catalog ID: {song.catalogId}</span>
                </li>
            </ul>
        )
    })
    return(
        <div> 
            {concertDetails}
        </div>
    )
}
import React from 'react';
import "./TopSongList.css";

function TopSongList({likedSongs}) {
    const topSongs = Object.keys(likedSongs).slice(0,10);

    return(
        <div className={"top-song-list"}>
            <h4>Your Top {topSongs.length} Songs</h4>
            {topSongs.map(songId => <p key={songId}>{likedSongs[songId].name} by <span style={{color: "#1DB954", fontWeight: "bold"}}>{likedSongs[songId].artists[0].name}</span></p>)}
        </div>
    )
}

export default TopSongList;
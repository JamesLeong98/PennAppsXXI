import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ProgressBar} from "react-bootstrap";
import "./SongStats";
import './Home.css';
import SongStats from "./SongStats";

function Home(props) {
    const USER_TOKEN = props.location.state.access_token;
    const AuthStr = 'Bearer '.concat(USER_TOKEN);
    const [name, setName] = useState("");
    const [likedSongs, setLikedSongs] = useState({});
    const [audioFeatures, setAudioFeatures] = useState([]);

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: AuthStr } }).then(res => {setName(res.data.display_name);})
        axios.get("https://api.spotify.com/v1/me/tracks", { headers: { Authorization: AuthStr } })
            .then(res => {
                const tracks = {};
                for (const track of res.data.items) {
                    if (track) tracks[track.track.id] = track.track;
                }
                setLikedSongs(tracks);
            })
    }, [USER_TOKEN, AuthStr])

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/audio-features", {params: {ids: Object.keys(likedSongs).join()}, headers: { Authorization: AuthStr }})
            .then(res => {
                const features = {}
                for (const detail of res.data.audio_features) {
                    if (detail) features[detail.id] = detail;
                }
                setAudioFeatures(features);
            })
    }, [likedSongs, AuthStr])

    function generateFind(data) {
        axios.post('http://localhost:5000/analyze_music', {artist: 'Taylor Swift', song: 'Mean'}).then(res => console.log(res))
    }

    return (
        <div>
            <h3 className={"welcome-title"}><span>Hello, </span><span style={{color: "#1DB954"}}>{name}</span></h3>
            <SongStats features={audioFeatures}/>
            {/*{Object.keys(likedSongs).map(songId => <p key={songId}>{likedSongs[songId].name} by <span style={{color: "#1DB954", fontWeight: "bold"}}>{likedSongs[songId].artists[0].name}</span></p>)}*/}
            <button onClick={generateFind}>Generate Playlist</button>
        </div>
    );
}

export default Home;

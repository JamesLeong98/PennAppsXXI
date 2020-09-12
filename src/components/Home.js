import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";

function Home(props) {
    const USER_TOKEN = props.location.state.access_token;
    const AuthStr = 'Bearer '.concat(USER_TOKEN);
    const [name, setName] = useState("");
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: AuthStr } }).then(res => {setName(res.data.display_name);})
        axios.get("https://api.spotify.com/v1/me/tracks", { headers: { Authorization: AuthStr } })
            .then(res => {
                const tracks = [];
                for (const track of res.data.items) {
                    tracks.push(track.track);
                }
                setLikedSongs(tracks);
            })
    }, [USER_TOKEN])

    axios.post('http://localhost:5000/home', {text: 'hello'}).then(res => console.log(res))

    return (
        <div>
            <h3><span>Hello, </span><span style={{color: "#1DB954"}}>{name}</span></h3>
            <h2>Your Top Songs</h2>
            {likedSongs.map(song => <p key={song.id}>{song.name} by <span style={{color: "#1DB954", fontWeight: "bold"}}>{song.artists[0].name}</span></p>)}
        </div>
    );
}

export default Home;

import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Home.css';
import SongStats from "./SongStats";
import TopSongList from "./TopSongList";
import SongSentiments from "./SongSentiments";
import CreatePlaylist from "./CreatePlaylist";

function Home(props) {
    const USER_TOKEN = props.location.state.access_token;
    const AuthStr = 'Bearer '.concat(USER_TOKEN);
    const [user, setUser] = useState({});
    const [likedSongs, setLikedSongs] = useState({});
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [lyricSentiments, setLyricSentiments] = useState([]);

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: AuthStr } }).then(res => {setUser(res.data);})
        axios.get("https://api.spotify.com/v1/me/top/tracks?limit=50", { headers: { Authorization: AuthStr } })
            .then(res => {
                const tracks = {};
                for (const track of res.data.items) {
                    if (track) tracks[track.id] = track;
                }
                setLikedSongs(tracks);
            })
    }, [USER_TOKEN, AuthStr])

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/audio-features", {params: {ids: Object.keys(likedSongs).join()}, headers: { Authorization: AuthStr }})
            .then(res => {
                const features = {}
                for (const detail of res.data.audio_features) {
                    if (detail) {
                        features[detail.id] = detail;
                    }
                }
                setAudioFeatures(features);
            })

        const songInfo = {}
        for (const songId of Object.keys(likedSongs)) {
            songInfo[songId] = {artist: likedSongs[songId].artists[0].name, song: likedSongs[songId].name}
        }
        axios.post('http://localhost:5000/analyze_music', songInfo)
            .then(res => {setLyricSentiments(res.data)});

    }, [likedSongs, AuthStr])

    return (
        <div>
            <h3 className={"welcome-title"}><span>Hello, </span><span style={{color: "#1DB954"}}>{user.display_name}</span></h3>
            <table className={"main-table"}>
                <thead>
                <tr>
                    <td><TopSongList likedSongs={likedSongs} /></td>
                    <td><SongStats features={audioFeatures}/></td>
                </tr>
                </thead>
            </table>
            <SongSentiments sentiments={lyricSentiments} />
            <CreatePlaylist AuthStr={AuthStr} user={user} likedSongs={likedSongs} audioFeatures={audioFeatures}/>
        </div>
    );
}

export default Home;

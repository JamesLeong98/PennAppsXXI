import React, {useCallback, useState} from 'react';
import './CreatePlaylist.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from "axios";


function CreatePlaylist({AuthStr, user, likedSongs, audioFeatures}) {
    const onHappy = () => {
        createPlaylist("Happy");
    }

    const createPlaylist = mood => {
        const data = {name: `Your ${mood} Playlist`, description: "By Mood Playlist Generator", public: false};
        axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, data,{ headers: { Authorization: AuthStr }})
            .then(res => {addSongs(mood, res.data.id)});
    };

    const addSongs = (mood, playlistId) => {
        const songsToAdd = [];
        if (playlistId !== "") {
            axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {uris: ["spotify:track:6xsanHBuSwNCTESsldlB0o","spotify:track:6xsanHBuSwNCTESsldlB0o"]}, {headers: { Authorization: AuthStr }})
                .then(() => {alert("Playlist created in your spotify!")});
        }
    }

    return (
        <div>
            <h4 className={"mood-playlist-title"}>Generate Your Mood Playlist!</h4>
            <AwesomeButton type="primary" onReleased={onHappy}>Happy</AwesomeButton>
            <AwesomeButton type="secondary">Heartbreak</AwesomeButton>
            <AwesomeButton type="primary">Party</AwesomeButton>
            <AwesomeButton type="secondary">Uplifting</AwesomeButton>
            <AwesomeButton type="primary">Chill</AwesomeButton>
            <AwesomeButton type="secondary">Romantic</AwesomeButton>
        </div>
    )
}

export default CreatePlaylist;
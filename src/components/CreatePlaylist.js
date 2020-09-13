import React, {useCallback, useState} from 'react';
import './CreatePlaylist.css';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from "axios";


function CreatePlaylist({AuthStr, user, likedSongs, audioFeatures}) {
    const onUplifting = () => {
        createPlaylist("Uplifting");
    }

    const onSad = () => {
        createPlaylist("Sad");
    }

    const onParty = () => {
        createPlaylist("Party");
    }

    const onChill = () => {
        createPlaylist("Chill");
    }

    const onRomantic = () => {
        createPlaylist("Romantic");
    }

    const createPlaylist = mood => {
        const data = {name: `Your ${mood} Playlist`, description: "By Mood Playlist Generator", public: false};
        axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, data,{ headers: { Authorization: AuthStr }})
            .then(res => {filterSongs(mood, res.data.id)});
    };

    const filterSongs = (mood, playlistId) => {
        const songsToCheck = [];
        const uriList = [];
        const audios = Object.keys(audioFeatures);
        for (const id of audios) {
            const song = audioFeatures[id];
            songsToCheck.push(`{${song.danceability},${song.energy},${song.loudness},${song.speechiness},${song.acousticness},${song.liveness},${song.valence},${song.tempo}}`)
        }
        axios.get(`https://www.wolframcloud.com/obj/ryan.chang/mood?a={${songsToCheck.join()}}`)
            .then(res => {
                let str = res.data.replaceAll('"', '');
                str = str.replaceAll('{', '');
                str = str.replaceAll('}', '');
                str = str.replaceAll(' ', '');
                const arr = str.split(",")
                for (let i=0; i<arr.length; i++) {
                    if (arr[i] == mood) {
                        uriList.push(likedSongs[audios[i]].uri)
                    }
                }
                console.log(uriList);
                addSongs(uriList, playlistId)
            })
    }

    const addSongs = (uriList, playlistId) => {
        if (uriList.length > 0) {
            axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {uris: uriList}, {headers: { Authorization: AuthStr }})
                .then(() => {alert("Playlist created in your spotify!")});
        }
    }

    return (
        <div>
            <h4 className={"mood-playlist-title"}>Generate Your Mood Playlist!</h4>
            <AwesomeButton type="primary" onReleased={onChill}>Chill</AwesomeButton>
            <AwesomeButton type="secondary" onReleased={onSad}>Sad</AwesomeButton>
            <AwesomeButton type="primary" onReleased={onParty}>Party</AwesomeButton>
            <AwesomeButton type="secondary" onReleased={onUplifting}>Uplifting</AwesomeButton>
            <AwesomeButton type="primary" onReleased={onRomantic}>Romantic</AwesomeButton>
        </div>
    )
}

export default CreatePlaylist;
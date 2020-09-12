import React from 'react';
import './SongStats.css';
import {ProgressBar} from "react-bootstrap";

function SongStats({features}) {
    const energy = [];
    const danceability = [];
    const speechiness = [];
    const valence = [];
    const duration = [];
    console.log(features);
    for (const id of Object.keys(features)) {
        energy.push(features[id].energy);
        danceability.push(features[id].danceability);
        speechiness.push(features[id].speechiness);
        valence.push(features[id].valence);
        duration.push(features[id].duration_ms);
    }

    const energyLevel = Math.round(energy.reduce((a, b) => a + b, 0) * 100 / energy.length);
    const danceLevel = Math.round(danceability.reduce((a, b) => a + b, 0) * 100 / energy.length);
    const speechLevel = Math.round(speechiness.reduce((a, b) => a + b, 0) * 100 / energy.length);
    const valenceLevel = Math.round(valence.reduce((a, b) => a + b, 0) * 100 / energy.length);
    const durationLevel = Math.round(duration.reduce((a, b) => a + b, 0) /1000 / energy.length);

    return(
        <div className={"song-stats"}>
            <h2>Your Song Stats</h2>
            <ProgressBar now={energyLevel} label={`${energyLevel}%`}/>
            <ProgressBar now={danceLevel} label={`${danceLevel}%`}/>
            <ProgressBar now={speechLevel} label={`${speechLevel}%`}/>
            <ProgressBar now={valenceLevel} label={`${valenceLevel}%`}/>
            <span>Average Duration: {Math.floor(durationLevel/60)} min {durationLevel%60}s</span>
        </div>

    )
}

export default SongStats
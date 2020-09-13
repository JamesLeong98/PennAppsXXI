import React from 'react';
import './SongStats.css';
import {ProgressBar} from "react-bootstrap";

function SongStats({features}) {
    const acousticness = [];
    const energy = [];
    const danceability = [];
    const speechiness = [];
    const valence = [];
    const duration = [];

    for (const id of Object.keys(features)) {
        acousticness.push(features[id].acousticness);
        energy.push(features[id].energy);
        danceability.push(features[id].danceability);
        speechiness.push(features[id].speechiness);
        valence.push(features[id].valence);
        duration.push(features[id].duration_ms);
    }

    const acousticLevel = Math.round(acousticness.reduce((a, b) => a + b, 0) * 100 / acousticness.length);
    const energyLevel = Math.round(energy.reduce((a, b) => a + b, 0) * 100 / energy.length);
    const danceLevel = Math.round(danceability.reduce((a, b) => a + b, 0) * 100 / energy.length);
    const speechLevel = Math.round(speechiness.reduce((a, b) => a + b, 0) * 100 / energy.length);
    const valenceLevel = Math.round(valence.reduce((a, b) => a + b, 0) * 100 / energy.length);
    const durationLevel = Math.round(duration.reduce((a, b) => a + b, 0) /1000 / energy.length);

    return(
        <div className={"song-stats"}>
            <h4>Audio Stats</h4>
            <p>Acousticness</p>
            <ProgressBar now={acousticLevel} label={`${acousticLevel}%`}/>
            <p>Energy</p>
            <ProgressBar variant="warning" now={energyLevel} label={`${energyLevel}%`}/>
            <p>Danceability</p>
            <ProgressBar variant="danger"  now={danceLevel} label={`${danceLevel}%`}/>
            <p>Speechiness</p>
            <ProgressBar variant="success" now={speechLevel} label={`${speechLevel}%`}/>
            <p>Valence</p>
            <ProgressBar variant="info" now={valenceLevel} label={`${valenceLevel}%`}/>
            <p style={{marginTop: "40px"}}>Average Song Duration: {Math.floor(durationLevel/60)} min {durationLevel%60}s</p>
        </div>
    )
}

export default SongStats;
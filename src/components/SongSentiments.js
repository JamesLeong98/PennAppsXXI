import React from 'react';
import './SongSentiments.css';
import { Doughnut, defaults } from 'react-chartjs-2';
import { Spinner } from 'react-bootstrap';

function SongSentiments({sentiments}) {
    const length = Object.keys(sentiments).length;
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    for (const id of Object.keys(sentiments)) {
        const sentiment = sentiments[id];
        switch (sentiment['sentiment']) {
            case "Positive":
                positive += 1;
                break;
            case "Negative":
                negative += 1;
                break;
            case "Neutral":
                neutral += 1;
                break;
            default:
                break;
        }
    }

    const options = {
        legend: {
            labels: {
                fontColor: 'white',
            }
        }
    }

    const data = {
        datasets: [{
            data: [positive, negative, neutral],
            backgroundColor: ['#28a745', '#dc3545', '#007bff'],
            borderWidth: [1,1,1],
            fontColor: 'white',
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Positive',
            'Negative',
            'Neutral'
        ],
    };

    return (
        <div className={"sentiments"}>
            <h4 className={"sentiment-title"}>Lyrical Sentiments</h4>
            {length > 0 ?
            <Doughnut data={data} options={options}/> : <Spinner animation="grow" />}
        </div>
    )
}

export default SongSentiments;
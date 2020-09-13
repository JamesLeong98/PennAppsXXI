from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from bs4 import BeautifulSoup
import requests
import os
import re

analyser = SentimentIntensityAnalyzer()

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/analyze_music', methods = ['GET', 'POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)

def analyze_music():
    input = request.get_json()
    res = {}

    for (k,v) in input.items():
        try:
            song_details = get_song_url(v['artist'], v['song'])
            song_url = song_details['response']['hits'][0]['result']['url']
            song_lyrics = scrape_lyrics(song_url)
            sentiment_score = analyser.polarity_scores(song_lyrics)

            if sentiment_score['compound'] >= 0.05:
                sentiment_percentage = sentiment_score['compound']
                sentiment = 'Positive'
            elif sentiment_score['compound'] > -0.05 and sentiment_score['compound'] < 0.05:
                sentiment_percentage = sentiment_score['compound']
                sentiment = 'Neutral'
            elif sentiment_score['compound'] <= -0.05:
                sentiment_percentage = sentiment_score['compound']
                sentiment = 'Negative'

        except:
            sentiment = 'None'
            sentiment_percentage = 0

        res[k] = {'sentiment': sentiment, 'score': abs(sentiment_percentage) * 100 }

    return jsonify(res)

def get_song_url(artist, song):
    client_token = "L3Xzgv6bnh1jEVdIJgF-t5JLxz2GJqbCTnEZyFdgq8JhHY6GM5K_1Ek9uKpBYgMw"
    song = song.replace(" ", "%20")
    artist = artist.replace(" ", "%20")
    request_url = "https://api.genius.com/search?q=" + artist + song
    response = requests.get(request_url, headers={'Authorization': 'Bearer ' + client_token})
    return response.json()

def scrape_lyrics(url):
    page = requests.get(url)
    html = BeautifulSoup(page.text, 'html.parser')
    lyrics1 = html.find("div", class_="lyrics")
    lyrics2 = html.find("div", class_="Lyrics__Container-sc-1ynbvzw-2 jgQsqn")
    if lyrics1:
        lyrics = lyrics1.get_text()
        lyrics = re.sub(r'[\(\[].*?[\)\]]', '', lyrics)
        lyrics = os.linesep.join([s for s in lyrics.splitlines() if s])
    elif lyrics2:
        lyrics = lyrics2.get_text()
        lyrics = re.sub(r'[\(\[].*?[\)\]]', '', lyrics)
        lyrics = os.linesep.join([s for s in lyrics.splitlines() if s])
    elif lyrics1 == lyrics2 == None:
        lyrics = None
    return lyrics

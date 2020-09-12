from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/home', methods = ['GET', 'POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def home():
    data = request.get_json()
    print(data)
    return jsonify({'new_text': data['text'] + "new"})

from flask import Flask, request, jsonify
from mood import getFeeling, polarityToMood
app = Flask(__name__)


@app.route("/feeling")
def feeling():
    text = request.args.get("text")
    fast = request.args.get("fast").default(False)
    polarity = getFeeling(text)
    mood = polarityToMood(polarity)
    return jsonify({"polarity": polarity, "mood": mood})
from flask import Flask, render_template, request
from elasticsearch import Elasticsearch
import json

from pip._vendor import requests

app = Flask(__name__)
es = Elasticsearch()


@app.route('/', methods=["GET", "POST"])
def index():
    q = request.form.get("q")

    if q is not None:
        resp = es.search(index='spotifyapp', doc_type='images', body={"query": {"match": {"master_pi": 45}}})
        print(resp)

        return render_template("index.html", q=q, response=resp["hits"]["hits"])

    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True, port=8914)

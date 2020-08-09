from flask import Flask, render_template, request
from elasticsearch import Elasticsearch
import json

from pip._vendor import requests

app = Flask(__name__)
es = Elasticsearch()


@app.route('/', methods=["GET", "POST"])
def index():
    q = request.form.get("q")

    # content = pingHttpHost(host)
    # host = "http://localhost:9200/json_trial/images/_search?q=master_pi:"+id
    # print("q = ", q)
    if q is not None:
        resp = es.search(index='spotifyapp', doc_type='images', body={"query": {"match": {"master_pi": 45}}})
        print(resp)

        return render_template("index.html", q=q, response=resp["hits"]["hits"])

    return render_template('index.html')


# @app.route('/', methods=["GET"])
# def index_page():
#     return render_template('index.html')

# def pingHttpHost(host):
#     r = requests.get(host, verify=False)
#     return r.content


if __name__ == "__main__":
    app.run(debug=True, port=8914)

import flask
import flask_cors

app = flask.Flask(__name__)
cors = flask_cors.CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/update", methods=['GET'])
def handle_update():
    lyric = flask.request.args['sentence']
    print(lyric)
    return "OK"


@app.route("/")
def default():
    return "discord_lyrics running..."


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6966)

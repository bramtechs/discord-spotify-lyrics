import flask
import threading
import flask_cors
import spotipy
from pypresence import Presence
import time

client_id = '1046098424149311529'
RPC = Presence(client_id, pipe=0)  # Initialize the client class

app = flask.Flask(__name__)
cors = flask_cors.CORS(app, resources={r"/*": {"origins": "*"}})

sentence = "..."
title = "Unknown - Unkown"
end_time = 1


@app.route("/update", methods=['GET'])
def handle_update():
    global sentence, title, end_time
    sentence = flask.request.args['sentence']
    title = flask.request.args['title']
    end_time = int(flask.request.args['ends'])
    print(int(end_time))
    return "OK"


@app.route("/")
def default():
    return "discord_lyrics running..."


def flask_thread():
    app.run(host='0.0.0.0', port=6966)


if __name__ == '__main__':
    x = threading.Thread(target=flask_thread)
    x.daemon = True
    x.start()

    print("connecting to discord...")
    RPC.connect()  # Start the handshake loop
    print("connected to discord!")

    while True:  # The presence will stay on as long as the program is running
        state = "🎵 " + sentence
        if len(state) < 2 or sentence == '♪':  # prevent pauses from crashing
            sentence = "(Intermission)"
        RPC.update(details=title,
                   state=state,
                   end=end_time)
        time.sleep(2)

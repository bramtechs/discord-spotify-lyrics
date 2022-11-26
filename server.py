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


@app.route("/update", methods=['GET'])
def handle_update():
    global sentence
    sentence = flask.request.args['sentence']
    print(sentence)
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
        RPC.update(details="Rick Astley - Never gonna give you up",
                   state=str(sentence))
        time.sleep(3)

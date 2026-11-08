from flask import Flask
from flask_cors import CORS

from routes.search import search_blueprint

app = Flask(__name__)
CORS(app)
app.register_blueprint(search_blueprint, url_prefix="/api")


if __name__ == "__main__":
    app.run(debug=True, port=5000)

from flask import Flask
from flask_cors import CORS

from routes.search import search_blueprint
from routes.upload import upload_blueprint
from routes.prediction import prediction_blueprint

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024
CORS(app)
app.register_blueprint(search_blueprint, url_prefix="/api")
app.register_blueprint(upload_blueprint, url_prefix="/api")
app.register_blueprint(prediction_blueprint, url_prefix="/api")


@app.errorhandler(413)
def request_entity_too_large(_error):
    return {"error": "PDF files must be 10 MB or smaller."}, 413


if __name__ == "__main__":
    app.run(debug=True, port=5000)

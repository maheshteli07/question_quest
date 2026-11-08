import csv
from pathlib import Path

from flask import Blueprint, jsonify, request

from services.prediction_service import predict_questions
from services.topic_clustering import cluster_topics

prediction_blueprint = Blueprint("prediction", __name__)
DATA_PATH = Path(__file__).parents[1] / "data" / "questions.csv"


def load_questions() -> list[dict]:
    with DATA_PATH.open(newline="", encoding="utf-8") as file:
        return list(csv.DictReader(file))


@prediction_blueprint.post("/predictions")
def get_predictions():
    payload = request.get_json(silent=True)
    text = payload.get("text", "").strip() if isinstance(payload, dict) else ""
    if not text:
        return jsonify({"error": "Provide text to generate question predictions."}), 400
    if len(text) > 100_000:
        return jsonify({"error": "Prediction text must be 100,000 characters or fewer."}), 400

    predictions = predict_questions(text, load_questions())
    return jsonify(
        {
            "extracted_questions": predictions["extracted_questions"],
            "predictions": predictions["predictions"],
            "topics": cluster_topics(predictions["predictions"]),
        }
    )

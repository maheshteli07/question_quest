from pathlib import Path
import csv

from flask import Blueprint, jsonify, request

from services.bm25_search import search as bm25_search
from services.hybrid_search import search as hybrid_search
from services.semantic_search import search as semantic_search
from services.tfidf_search import search as tfidf_search

search_blueprint = Blueprint("search", __name__)
DATA_PATH = Path(__file__).parents[1] / "data" / "questions.csv"


def load_questions() -> list[dict]:
    with DATA_PATH.open(newline="", encoding="utf-8") as file:
        return list(csv.DictReader(file))


@search_blueprint.get("/search")
def search_questions():
    query = request.args.get("q", "").strip()
    model = request.args.get("model", "hybrid")
    searchers = {
        "tfidf": tfidf_search,
        "bm25": bm25_search,
        "semantic": semantic_search,
        "hybrid": hybrid_search,
    }
    if not query:
        return jsonify([])
    if model not in searchers:
        return jsonify({"error": f"Unknown search model: {model}"}), 400
    return jsonify(searchers[model](load_questions(), query))

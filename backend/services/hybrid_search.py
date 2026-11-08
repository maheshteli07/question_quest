from .bm25_search import search as bm25_search
from .semantic_search import search as semantic_search


def search(questions: list[dict], query: str, limit: int = 20) -> list[dict]:
    lexical = bm25_search(questions, query, limit)
    semantic = semantic_search(questions, query, limit)
    scores: dict[str, float] = {}
    ranked_questions: dict[str, dict] = {}
    for results in (lexical, semantic):
        for rank, question in enumerate(results, start=1):
            question_id = str(question["id"])
            ranked_questions[question_id] = question
            scores[question_id] = scores.get(question_id, 0) + 1 / (60 + rank)

    ranked_ids = sorted(scores, key=lambda question_id: scores[question_id], reverse=True)
    return [ranked_questions[question_id] for question_id in ranked_ids[:limit]]

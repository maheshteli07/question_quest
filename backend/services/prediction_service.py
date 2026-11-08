from .embedding_service import rank_by_similarity
from .question_extractor import extract_questions


def predict_questions(
    text: str, questions: list[dict], limit: int = 10
) -> dict:
    source_questions = extract_questions(text)
    matches: dict[str, dict] = {}

    for source_question in source_questions:
        for candidate in rank_by_similarity(source_question, questions, limit):
            candidate_id = str(candidate["id"])
            score = candidate.pop("similarity")
            current = matches.get(candidate_id)
            if current is None or score > current["prediction_score"]:
                matches[candidate_id] = {
                    **candidate,
                    "prediction_score": score,
                    "source_question": source_question,
                }

    predictions = sorted(
        matches.values(),
        key=lambda question: (
            -question["prediction_score"],
            str(question["id"]),
        ),
    )[:limit]
    return {
        "extracted_questions": source_questions,
        "predictions": predictions,
    }

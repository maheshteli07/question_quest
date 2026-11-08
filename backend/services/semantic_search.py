from .embedding_service import rank_by_similarity


def search(questions: list[dict], query: str, limit: int = 20) -> list[dict]:
    return [
        {key: value for key, value in question.items() if key != "similarity"}
        for question in rank_by_similarity(query, questions, limit)
    ]

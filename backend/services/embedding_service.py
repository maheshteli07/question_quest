from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .preprocessing import searchable_text


def rank_by_similarity(
    query: str, questions: list[dict], limit: int = 20
) -> list[dict]:
    if not query.strip() or not questions:
        return []

    documents = [searchable_text(question) for question in questions]
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words="english")
    try:
        vectors = vectorizer.fit_transform([query, *documents])
    except ValueError:
        return []

    scores = cosine_similarity(vectors[0:1], vectors[1:]).ravel()
    ranked = sorted(
        enumerate(scores),
        key=lambda item: (-float(item[1]), item[0]),
    )
    return [
        {**questions[index], "similarity": float(score)}
        for index, score in ranked[:limit]
        if score > 0
    ]

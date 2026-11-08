from .tfidf_search import search as tfidf_search


def search(questions: list[dict], query: str, limit: int = 20) -> list[dict]:
    """Use lexical results as a deterministic fallback without an embedding model."""
    return tfidf_search(questions, query, limit)

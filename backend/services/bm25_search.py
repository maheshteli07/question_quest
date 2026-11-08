from .tfidf_search import search as tfidf_search


def search(questions: list[dict], query: str, limit: int = 20) -> list[dict]:
    """Use the lexical search fallback until a BM25 index is configured."""
    return tfidf_search(questions, query, limit)

from .bm25_search import search as bm25_search
from .semantic_search import search as semantic_search


def search(questions: list[dict], query: str, limit: int = 20) -> list[dict]:
    lexical = bm25_search(questions, query, limit)
    semantic = semantic_search(questions, query, limit)
    merged = {question["id"]: question for question in lexical + semantic}
    return list(merged.values())[:limit]

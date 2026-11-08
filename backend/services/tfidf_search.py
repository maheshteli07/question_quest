from .preprocessing import searchable_text, tokenize


def search(questions: list[dict], query: str, limit: int = 20) -> list[dict]:
    terms = set(tokenize(query))
    if not terms:
        return []

    scored = []
    for question in questions:
        words = tokenize(searchable_text(question))
        score = sum(words.count(term) for term in terms)
        if score:
            scored.append((score, question))
    return [question for _, question in sorted(scored, key=lambda item: item[0], reverse=True)[:limit]]

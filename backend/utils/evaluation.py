def precision_at_k(results: list[str], relevant: set[str], k: int = 10) -> float:
    """Calculate precision for the first k result identifiers."""
    selected = results[:k]
    if not selected:
        return 0.0
    return sum(result in relevant for result in selected) / len(selected)

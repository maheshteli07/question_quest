import re


def tokenize(text: str) -> list[str]:
    """Normalize text into searchable terms."""
    return re.findall(r"[a-z0-9]+", text.lower())


def searchable_text(question: dict) -> str:
    return " ".join(
        str(question.get(field, ""))
        for field in ("title", "body", "category")
    )

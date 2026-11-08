import re


def extract_questions(text: str, limit: int = 10) -> list[str]:
    candidates = re.findall(r"[^?]*\?", text)
    questions = []
    seen = set()

    for candidate in candidates:
        question = " ".join(candidate.split()).strip(" -\t\r\n")
        normalized = question.casefold()
        if len(question) >= 8 and normalized not in seen:
            seen.add(normalized)
            questions.append(question)
        if len(questions) == limit:
            break

    return questions or [" ".join(text.split())]

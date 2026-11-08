from collections import defaultdict


def cluster_topics(questions: list[dict]) -> list[dict]:
    topic_scores: dict[str, list[float]] = defaultdict(list)
    for question in questions:
        topic = str(question.get("category", "")).strip()
        if topic:
            topic_scores[topic].append(float(question.get("prediction_score", 0)))

    topics = [
        {
            "name": name,
            "count": len(scores),
            "score": sum(scores) / len(scores),
        }
        for name, scores in topic_scores.items()
    ]
    return sorted(topics, key=lambda topic: (-topic["score"], topic["name"]))

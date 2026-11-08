function PredictionCard({ question, rank }) {
  return (
    <article className="question-card prediction-card">
      <div>
        <span className="question-category">
          {question.category} · Prediction {rank}
        </span>
        <h3>{question.title}</h3>
        <p>{question.body}</p>
        <p className="prediction-score">
          Relevance: {Math.round(question.prediction_score * 100)}%
        </p>
      </div>
      <a href={question.url} target="_blank" rel="noreferrer">
        View question
      </a>
    </article>
  )
}

export default PredictionCard

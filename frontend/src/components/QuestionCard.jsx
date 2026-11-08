function QuestionCard({ question }) {
  return (
    <article className="question-card">
      <div>
        <span className="question-category">{question.category}</span>
        <h3>{question.title}</h3>
        <p>{question.body}</p>
      </div>
      <a href={question.url} target="_blank" rel="noreferrer">
        View question
      </a>
    </article>
  )
}

export default QuestionCard

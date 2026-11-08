import { useState } from 'react'
import PredictionCard from '../components/PredictionCard'
import { predictQuestions } from '../services/api'

function Predictions() {
  const [text, setText] = useState(() => {
    try {
      return window.sessionStorage.getItem('prediction-text') || ''
    } catch {
      return ''
    }
  })
  const [predictions, setPredictions] = useState([])
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasPredicted, setHasPredicted] = useState(false)

  async function submitPredictions(event) {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setHasPredicted(false)

    try {
      const result = await predictQuestions(text)
      setPredictions(result.predictions)
      setTopics(result.topics)
      setHasPredicted(true)
    } catch (predictionError) {
      setError(predictionError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="page">
      <p className="eyebrow">Explore what to ask next</p>
      <h1>Question predictions</h1>
      <p className="lead">
        Paste notes or use text extracted from an uploaded PDF to find related
        questions from the collection.
      </p>
      <form className="prediction-form" onSubmit={submitPredictions}>
        <label htmlFor="prediction-text">Document or topic text</label>
        <textarea
          id="prediction-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={100000}
          required
          rows={8}
          placeholder="Paste text from a document or describe a topic..."
        />
        <button type="submit" disabled={isLoading || !text.trim()}>
          {isLoading ? 'Generating predictions…' : 'Predict questions'}
        </button>
      </form>
      {error && <p className="upload-error" role="alert">{error}</p>}
      {hasPredicted && (
        <section className="prediction-results" aria-live="polite">
          <h2>Related topics</h2>
          {topics.length ? (
            <p>{topics.map((topic) => `${topic.name} (${topic.count})`).join(' · ')}</p>
          ) : (
            <p>No related topics were found.</p>
          )}
          <h2>Predicted questions</h2>
          {predictions.length ? (
            predictions.map((question, index) => (
              <PredictionCard
                key={question.id}
                question={question}
                rank={index + 1}
              />
            ))
          ) : (
            <p>No matching questions were found. Try adding more context.</p>
          )}
        </section>
      )}
    </section>
  )
}

export default Predictions

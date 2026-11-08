import { useEffect, useState } from 'react'
import FilterPanel from '../components/FilterPanel'
import QuestionCard from '../components/QuestionCard'
import SearchBar from '../components/SearchBar'
import { searchQuestions } from '../services/api'

function Search() {
  const [query, setQuery] = useState(
    new URLSearchParams(window.location.search).get('q') || '',
  )
  const [model, setModel] = useState('hybrid')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query.trim()) {
      return
    }

    let active = true
    searchQuestions(query, model)
      .then((questions) => {
        if (active) setResults(questions)
      })

    return () => {
      active = false
    }
  }, [query, model])

  function submitSearch(event) {
    event.preventDefault()
    window.history.replaceState({}, '', `/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <section className="page search-page">
      <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch} />
      <div className="search-layout">
        <FilterPanel selectedModel={model} onModelChange={setModel} />
        <main className="results">
          <p className="result-count">
            {query ? `${results.length} results` : ''}
          </p>
          {query &&
            results.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          {query && results.length === 0 && (
            <p className="empty-state">No questions found. Try a broader search.</p>
          )}
        </main>
      </div>
    </section>
  )
}

export default Search

import { useState } from 'react'
import SearchBar from '../components/SearchBar'

function Home() {
  const [query, setQuery] = useState('')
  function submitSearch(event) {
    event.preventDefault()
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  return (
    <section className="page home-page">
      <p className="eyebrow">Find better answers, faster</p>
      <h1>Ask less. Discover more.</h1>
      <p className="lead">
        Search a curated collection of questions with lexical, ranking, and
        semantic search in one place.
      </p>
      <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch} />
    </section>
  )
}

export default Home

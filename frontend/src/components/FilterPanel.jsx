function FilterPanel({ selectedModel, onModelChange }) {
  return (
    <aside className="filter-panel">
      <h2>Search method</h2>
      <label htmlFor="search-model">Ranking model</label>
      <select
        id="search-model"
        value={selectedModel}
        onChange={(event) => onModelChange(event.target.value)}
      >
        <option value="hybrid">Hybrid</option>
        <option value="tfidf">TF-IDF</option>
        <option value="bm25">BM25</option>
        <option value="semantic">Semantic</option>
      </select>
    </aside>
  )
}

export default FilterPanel

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <label htmlFor="question-search">Search questions</label>
      <div className="search-input">
        <input
          id="question-search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Try: How do I learn Python?"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  )
}

export default SearchBar

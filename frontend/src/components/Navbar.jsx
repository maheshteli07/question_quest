function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/">
        Question Quest
      </a>
      <nav aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/search">Search</a>
        <a href="/about">About</a>
      </nav>
    </header>
  )
}

export default Navbar

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Predictions from './pages/Predictions'
import Results from './pages/Results'
import Search from './pages/Search'
import Upload from './pages/Upload'
import './App.css'

function App() {
  const path = window.location.pathname

  return (
    <>
      <Navbar />
      {path === '/search' ? (
        <Search />
      ) : path === '/results' ? (
        <Results />
      ) : path === '/predictions' ? (
        <Predictions />
      ) : path === '/upload' ? (
        <Upload />
      ) : (
        <Home />
      )}
    </>
  )
}

export default App

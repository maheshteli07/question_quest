import Navbar from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home'
import Search from './pages/Search'
import './App.css'

function App() {
  const path = window.location.pathname

  return (
    <>
      <Navbar />
      {path === '/search' ? <Search /> : path === '/about' ? <About /> : <Home />}
    </>
  )
}

export default App

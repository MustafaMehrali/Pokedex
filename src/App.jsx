import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Pokedex from './pages/Pokedex'
import PokemonDetail from './pages/PokemonDetail'
import About from './pages/About'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

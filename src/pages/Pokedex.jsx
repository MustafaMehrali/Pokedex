import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'

const PAGE_SIZE = 20

export default function Pokedex() {
  const [page, setPage] = useState(0)
  const [pokemonList, setPokemonList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const offset = page * PAGE_SIZE
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`)
      .then((r) => r.json())
      .then(async (data) => {
        setTotal(data.count)
        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        )
        setPokemonList(details)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [page])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <>
      <div className="pokedex-header">
        <h1>Pokédex</h1>
        <p>
          {total > 0 && `Showing ${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, total)} of ${total} Pokémon`}
        </p>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner" />
          Loading Pokémon…
        </div>
      )}

      {error && <div className="error-msg">Error: {error}</div>}

      {!loading && !error && (
        <>
          <div className="pokemon-grid">
            {pokemonList.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => setPage(0)} disabled={page === 0}>
              «
            </button>
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
              ‹ Previous
            </button>
            <span>
              Page {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
            >
              Next ›
            </button>
            <button
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
            >
              »
            </button>
          </div>
        </>
      )}
    </>
  )
}

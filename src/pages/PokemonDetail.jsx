import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { typeColor } from '../utils/typeColor'

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
}

function statColor(value) {
  if (value >= 100) return '#78c850'
  if (value >= 70) return '#f8d030'
  if (value >= 45) return '#f08030'
  return '#c03028'
}

export default function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Pokémon not found')
        return r.json()
      })
      .then((data) => {
        setPokemon(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="loading"><div className="spinner" />Loading…</div>
  if (error) return <div className="error-msg">{error}</div>
  if (!pokemon) return null

  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  const heroBg = typeColor(primaryType)

  return (
    <>
      <Link to="/" className="detail-back">← Back to Pokédex</Link>

      <div className="detail-card">
        <div className="detail-hero" style={{ background: heroBg + '33' }}>
          <div className="bg-circle" />
          <span className="detail-number">#{String(pokemon.id).padStart(4, '0')}</span>
          <img src={sprite} alt={pokemon.name} />
          <h1>{pokemon.name}</h1>
          <div className="type-badges">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="type-badge"
                style={{ background: typeColor(type.name) }}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-body">
          {/* Basic info */}
          <div className="detail-section">
            <h2>Info</h2>
            <div className="detail-info-grid">
              <div className="info-item">
                <div className="label">Height</div>
                <div className="value">{(pokemon.height / 10).toFixed(1)} m</div>
              </div>
              <div className="info-item">
                <div className="label">Weight</div>
                <div className="value">{(pokemon.weight / 10).toFixed(1)} kg</div>
              </div>
              <div className="info-item">
                <div className="label">Base XP</div>
                <div className="value">{pokemon.base_experience ?? '—'}</div>
              </div>
              <div className="info-item">
                <div className="label">Forms</div>
                <div className="value">{pokemon.forms?.length ?? 1}</div>
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="detail-section">
            <h2>Abilities</h2>
            <div className="abilities-list">
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <span
                  key={ability.name}
                  className={`ability-badge${is_hidden ? ' hidden' : ''}`}
                  title={is_hidden ? 'Hidden ability' : ''}
                >
                  {ability.name}
                  {is_hidden && ' ✦'}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
            <h2>Base Stats</h2>
            <div className="stats-list">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="stat-row">
                  <span className="stat-name">{STAT_LABELS[stat.name] ?? stat.name}</span>
                  <span className="stat-val">{base_stat}</span>
                  <div className="stat-bar-bg">
                    <div
                      className="stat-bar-fill"
                      style={{
                        width: `${Math.min((base_stat / 255) * 100, 100)}%`,
                        background: statColor(base_stat),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import { Link } from 'react-router-dom'
import { typeColor } from '../utils/typeColor'

export default function PokemonCard({ pokemon }) {
  const id = pokemon.id
  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  return (
    <Link to={`/pokemon/${id}`} className="pokemon-card">
      <span className="number">#{String(id).padStart(4, '0')}</span>
      <img src={sprite} alt={pokemon.name} loading="lazy" />
      <span className="name">{pokemon.name}</span>
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
    </Link>
  )
}

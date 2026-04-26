import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="" width="24" height="24" />
        Pokédex
      </NavLink>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  )
}

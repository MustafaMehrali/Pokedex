export default function About() {
  return (
    <div className="about-page">
      <h1>About this Pokédex</h1>
      <p>
        This Pokédex is a React web application that lets you browse and discover
        information about all Pokémon. Use the home page to scroll through the
        complete list and click any card to see detailed stats, abilities, and more.
      </p>
      <p>
        All Pokémon data is fetched live from{' '}
        <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
          PokéAPI
        </a>
        , a free and open RESTful Pokémon API.
      </p>

      <div className="about-card">
        <h2>Tech stack</h2>
        <ul className="tech-list">
          <li>React 18</li>
          <li>React Router v6</li>
          <li>Vite</li>
          <li>PokéAPI (pokeapi.co)</li>
          <li>GitHub Pages (hosting)</li>
        </ul>
      </div>

      <div className="about-card" style={{ marginTop: '1rem' }}>
        <h2>How to use</h2>
        <ul className="tech-list">
          <li>Browse Pokémon on the home page</li>
          <li>Use Previous / Next to paginate through all Pokémon</li>
          <li>Click any card to view full details</li>
          <li>Use the back arrow to return to the list</li>
        </ul>
      </div>
    </div>
  )
}

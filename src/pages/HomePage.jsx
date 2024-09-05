import { useEffect, useState } from "react";
import Game from "../components/Games";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("Title");

  useEffect(() => {
    getGames();

    async function getGames() {
      const data = localStorage.getItem("games");

      let gamesData = [];

      if (data) {
        gamesData = JSON.parse(data);
      } else {
        gamesData = await fetchGames();
      }

      console.log(gamesData); // Log the fetched data
      setGames(gamesData.Games);
    }
  }, []);

  async function fetchGames() {
    const response = await fetch("https://raw.githubusercontent.com/AntiKiljoy/DataFiles/main/Gamelist.json");
    const data = await response.json();
    console.log(data); // Log the fetched data
    localStorage.setItem("games", JSON.stringify(data));
    return data;
  }

  let filteredGames = games.filter(game => game.Title.toLowerCase().includes(searchTerm.toLowerCase()));

  const titles = [...new Set(games.map(game => game.Title))];

  if (filter !== "") {
    filteredGames = filteredGames.filter(game => game.Title === filter);
  }

  filteredGames.sort((game1, game2) => game1[sortBy].localeCompare(game2[sortBy]));

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Title <input placeholder="Search" type="search" onChange={e => setSearchTerm(e.target.value)} />
        </label>
        <label>
          Filter by Title
          <select onChange={e => setFilter(e.target.value)}>
            <option value="">select title</option>
            {titles.map(title => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={e => setSortBy(e.target.value)}>
            <option value="Title">Title</option>
            <option value="Duration">Duration</option>
            <option value="Difficulty">Difficulty</option>
          </select>
        </label>
      </form>
      <section className="game-list">
        {filteredGames.map(game => (
          <Game game={game} key={game.Title} />
        ))}
      </section>
    </section>
  );
}

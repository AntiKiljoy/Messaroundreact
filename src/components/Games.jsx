import { useNavigate } from "react-router-dom";

export default function Game({ game }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/games/${game.Title}`);
  }

  console.log(game.image); // Log the image URL to the console

  return (
    <article className="game-line" onClick={handleClick}>
      <h2>{game.Title}</h2>
      <img src={game.image} alt={game.Title} className="game-image" />
      <p>{game.Description}</p>
      <p>Players: {game["Amount of Players"]}</p>
      <p>Duration: {game.Duration}</p>
      <p>Difficulty: {game.Difficulty}</p>
      <p>Location: {game.Location}</p>
    </article>
  );
}

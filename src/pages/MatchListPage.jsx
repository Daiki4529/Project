import { Link } from "react-router-dom";
import Button from "../components/Button";
import { MatchContext } from "../context/MatchProvider";
import { useContext, useEffect, useState } from "react";

function MatchListPage() {
  const [matches, setMatches] = useState([]);
  const { getMatches, createMatch } = useContext(MatchContext);
  const username = sessionStorage.getItem("username");
  const [filteredMatches, setFilteredMatches] = useState([]);

  const read = async () => {
    const result = await getMatches();
    const filteredMatches = result.data.filter((e) => e.winner === undefined);
    setMatches(result.data);
    setFilteredMatches(filteredMatches);
  };

  const create = async () => {
    await createMatch();
    read();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      read();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const totalMatches = matches.length;
  const totalFinishedMatches = matches.filter((e) => e.winner !== undefined).length;
  const wonMatches = matches.filter((e) => e.winner?.username === username).length;
  const lostMatches = matches.filter((e) => e.winner?.username !== username && e.winner !== null && e.winner !== undefined).length;
  const drawMatches = matches.filter((e) => e.winner === null).length;

  // Calcul des pourcentages
  const winrate = totalFinishedMatches > 0 ? ((wonMatches / totalFinishedMatches) * 100).toFixed(2) : 0;
  const lossrate = totalFinishedMatches > 0 ? ((lostMatches / totalFinishedMatches) * 100).toFixed(2) : 0;
  const drawrate = totalFinishedMatches > 0 ? ((drawMatches / totalFinishedMatches) * 100).toFixed(2) : 0;

  return (
    <>
      <h1>Matches</h1>
      <div className="match-list-container">
        <h2>Statistiques</h2>
        <p>Total de matchs : {totalMatches}</p>
        <p>Gagné : {wonMatches} ({winrate}%)</p>
        <p>Perdu : {lostMatches} ({lossrate}%)</p>
        <p>Égalité : {drawMatches} ({drawrate}%)</p>
        <h1 className="match-list-title">Liste des matchs</h1>
        <Button
            text="Créer un nouveau match"
            onClick={create}
            className="btn-primary create-match-btn"
        />
        <ul className="match-list">
          {filteredMatches.map((match) => (
              <li key={match._id} className="match-item">
                <div className="match-item-details">
                  <p>
                    Joueur 1: <strong>{match.user1.username}</strong>
                  </p>
                  <p>
                    Joueur 2:{" "}
                    <strong>
                      {match.user2 ? match.user2.username : "En attente"}
                    </strong>
                  </p>
                </div>
                {match.user2 && (
                    <Link to={`/matches/${match._id}`} className="view-match-link">
                      Voir le match
                    </Link>
                )}
              </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MatchListPage;

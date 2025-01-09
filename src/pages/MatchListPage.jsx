import { Link } from "react-router-dom";
import Button from "../components/Button";
import { MatchContext } from "../context/MatchProvider";
import { useContext, useEffect, useState } from "react";

function MatchListPage() {
  const [matches, setMatches] = useState([]);
  const { getMatches, createMatch } = useContext(MatchContext);

  const read = async () => {
    const result = await getMatches();
    const filteredMatches = result.data.filter((e) => e.winner === undefined);
    setMatches(filteredMatches);
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

  return (
    <>
      <h1>Matches</h1>
      <div className="match-list-container">
        <h1 className="match-list-title">Liste des matchs</h1>
        <Button
          text="Créer un nouveau match"
          onClick={create}
          className="btn-primary create-match-btn"
        />
        <ul className="match-list">
          {matches.map((match) => (
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
              <Link to={`/matches/${match._id}`} className="view-match-link">
                Voir le match
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MatchListPage;

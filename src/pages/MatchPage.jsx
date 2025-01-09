import { useContext, useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { MatchContext } from "../context/MatchProvider";
import Button from "../components/Button";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

function Match() {
  const { matchId } = useParams();
  const { getMatchById, playTurn } = useContext(MatchContext);
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [turnInProgress, setTurnInProgress] = useState(false);

  useEffect(() => {
    fetchMatch();
  }, []);

  const fetchMatch = async () => {
    try {
      const result = await getMatchById(matchId);
      setMatch(result.data);
    } catch (error) {
      console.error("Failed to fetch match:", error);
      setError("Failed to load match details.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTurnNumber = () => {
    const turns = match.turns;
    const lastTurn = turns[turns.length - 1] || {};
    const bothPlayed = lastTurn.user1 && lastTurn.user2;
    if (turns.length === 0 || bothPlayed) {
      return Math.min(turns.length + 1, 3);
    } else {
      return turns.length;
    }
  };

  const handlePlayTurn = async (move) => {
    setTurnInProgress(true);
    const turnNumber = calculateTurnNumber();
    try {
      await playTurn(matchId, turnNumber, move);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          if (data.turn === "not found") {
            alert("Error: Invalid turn ID.");
          } else if (data.turn === "not last") {
            alert("Error: Turn already completed.");
          } else if (data.match === "Match already finished") {
            alert("Error: Match is already finished.");
          } else if (data.user === "move already given") {
            alert(
              "Error: You have already played this turn and are waiting for your opponent."
            );
          } else {
            alert("Error: Unknown issue occurred.");
          }
        } else {
          alert("Error: Failed to play turn.");
        }
      }
    } finally {
      setTurnInProgress(false);
      fetchMatch();
    }
  };

  const getIcon = (move) => {
    switch (move) {
      case "rock":
        return <FaHandRock />;
      case "paper":
        return <FaHandPaper />;
      case "scissors":
        return <FaHandScissors />;
      default:
        return "?";
    }
  };

  if (loading) return <p className="loading">Loading match details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!match) <Navigate to="/matches" replace />;

  const { user1, user2, turns, winner } = match;
  const currentUser =
    sessionStorage.getItem("username") === user1.username ? "user1" : "user2";

  return (
    <div className="match-container">
      <h1 className="match-title">Match details</h1>
      <div className="players-container">
        <h2 className="players-title">Players</h2>
        <p className="players-info">
          <strong>{user1.username}</strong> vs <strong>{user2.username}</strong>
        </p>
      </div>
      <div className="turns-container">
        <h2 className="turns-title">Turns</h2>
        {turns.length > 0 ? (
          <ul className="turns-list">
            {turns.map((turn, index) => (
              <li key={index} className="turn-item">
                <p>Turn {index + 1}:</p>
                <p>
                  {user1.username} chose
                  <strong>
                    {" "}
                    {getIcon(
                      turn.user1 || (currentUser === "user1" ? "No move" : "?")
                    )}
                  </strong>
                </p>
                <p>
                  {user2.username} chose
                  <strong>
                    {" "}
                    {getIcon(
                      turn.user2 || (currentUser === "user2" ? "No move" : "?")
                    )}
                  </strong>
                </p>
                {turn.user1 && !turn.user2 ? (
                  currentUser === "user2" ? (
                    <p className="waiting">Waiting for you to play...</p>
                  ) : (
                    <p className="waiting">
                      Waiting for {user2.username} to play...
                    </p>
                  )
                ) : turn.user2 && !turn.user1 ? (
                  currentUser === "user1" ? (
                    <p className="waiting">Waiting for you to play...</p>
                  ) : (
                    <p className="waiting">
                      Waiting for {user1.username} to play...
                    </p>
                  )
                ) : turn.winner ? (
                  <p>
                    {turn.winner === "draw" ? (
                      <span className="result">
                        Result: <strong>Draw</strong>
                      </span>
                    ) : (
                      <span className="result">
                        Winner:{" "}
                        {turn.winner === "user1"
                          ? user1.username
                          : user2.username}
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="waiting">Waiting for opponent...</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-turns">No turns played yet.</p>
        )}
      </div>
      {!winner ? (
        <div className="play-turn-container">
          <h2 className="play-turn-title">Play Your Turn</h2>
          <Button
            text="Rock"
            onClick={() => handlePlayTurn("rock")}
            className="rock-btn"
            disabled={turnInProgress}
          />
          <Button
            text="Paper"
            onClick={() => handlePlayTurn("paper")}
            className="paper-btn"
            disabled={turnInProgress}
          />
          <Button
            text="Scissors"
            onClick={() => handlePlayTurn("scissors")}
            className="scissors-btn"
            disabled={turnInProgress}
          />
        </div>
      ) : (
        <div className="final-result-container">
          <h2 className="final-result-title">Final Result</h2>
          {winner ? (
            <p className="winner">
              Overall Winner: <strong>{winner.username}</strong>
            </p>
          ) : (
            <p className="draw">Match ended in a draw.</p>
          )}
        </div>
      )}
      <div className="back-container">
        <Button
          text="Back to Matches"
          onClick={() => navigate("/matches", { replace: true })}
        />
      </div>
    </div>
  );
}

export default Match;

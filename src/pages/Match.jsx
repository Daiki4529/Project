import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchContext } from "../context/MatchProvider";
import Button from "../components/Button";

function Match() {
  const { matchId } = useParams();
  const { getMatchById, playTurn } = useContext(MatchContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [match, setMatch] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [polling, setPolling] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);
  const [opponentWins, setOpponentWins] = useState(0);
  const [userNumber, setUserNumber] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const moves = ["rock", "paper", "scissors"];
  const currentUsername = sessionStorage.getItem("username");

  const getUserNumber = (match) => {
    if (match.user1.username === currentUsername) {
      return "user1";
    } else if (match.user2?.username === currentUsername) {
      return "user2";
    }
    return null;
  };

  useEffect(() => {
    fetchMatch();

    let intervalId;

    if (polling) {
      intervalId = setInterval(async () => {
        await fetchMatch();
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [polling]);

  const fetchMatch = async () => {
    try {
      const result = await getMatchById(matchId);
      setMatch(result.data);

      const userNum = getUserNumber(result.data);
      setUserNumber(userNum);

      let playerWinCount = 0;
      let opponentWinCount = 0;
      let drawCount = 0;

      result.data.turns.forEach((turn) => {
        if (turn.winner === userNum) {
          playerWinCount++;
        } else if (turn.winner && turn.winner !== "draw") {
          opponentWinCount++;
        } else if (turn.winner === "draw") {
          drawCount++;
        }
      });

      setPlayerWins(playerWinCount);
      setOpponentWins(opponentWinCount);

      if (playerWinCount >= 2 || opponentWinCount >= 2 || drawCount === 3) {
        setPolling(false);
        setIsWaiting(true);
        if (drawCount === 3) {
          setIsDraw(true);
        }
      }
    } catch (error) {
      console.error("Error fetching match data", error);
      setPolling(false);
      setIsWaiting(false);
    }
  };

  const play = async (move) => {
    if (playerWins >= 2 || opponentWins >= 2 || isDraw) {
      setErrorMessage("Game over. Please start a new match.");
      return;
    }

    try {
      setIsWaiting(true);
      await playTurn(matchId, getTurnNumber(), move);
      await fetchMatch();
      setPolling(true);
    } catch (error) {
      const { response } = error;
      if (response.data.user && response.data.user === "move already given") {
        setErrorMessage("Waiting for the other player to play...");
        setPolling(true);
      } else {
        setErrorMessage("An error occurred. Please try later.");
        setIsWaiting(false);
      }
    }
  };

  const getTurnNumber = () => {
    const turns = match.turns;
    if (turns[turns.length - 1]?.user1 && turns[turns.length - 1]?.user2) {
      return turns.length + 1;
    }
    return turns.length;
  };

  const getResult = (turn) => {
    if (turn.winner === "draw") return "Draw";
    if (!turn.winner) return "Tie";
    return turn.winner === userNumber ? "Win" : "Lose";
  };

  return (
    <div>
      {match && <h2>Tour {match.turns.length}</h2>}

      {/* <pre style={{ textAlign: "left" }}>{JSON.stringify(match, null, 2)}</pre> */}

      <div>
        <h3>Score</h3>
        <p>{match?.user1.username}: {userNumber === "user1" ? playerWins : opponentWins} wins</p>
        <p>{match?.user2?.username || "Opponent"}: {userNumber === "user2" ? playerWins : opponentWins} wins</p>
      </div>

      <h3>Turns</h3>
      {match?.turns
        .filter((turn) => turn.user1 && turn.user2)
        .map((turn, index) => (
          <p key={index}>
            Turn {index + 1}: {getResult(turn)}
          </p>
        ))
      }

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {playerWins < 2 && opponentWins < 2 && !isDraw && moves.map((move) => (
        <Button
          key={move}
          onClick={() => play(move)}
          text={move.at(0).toUpperCase() + move.slice(1)}
          disabled={isWaiting}
        />
      ))}

      {playerWins >= 2 && <h3>You won the match!</h3>}
      {opponentWins >= 2 && <h3>You lost the match!</h3>}
      {isDraw && <h3>The match is a draw!</h3>}
    </div>
  );
}

export default Match;

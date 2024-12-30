import React, {useContext, useEffect, useState} from "react";
import Button from "./Button";
import {MatchContext} from "../context/MatchProvider.jsx";

function MatchList({ token }) {
  const [matches, setMatches] = useState([])
    const [newMatches, setNewMatches] = useState([])
  const { getMatches, createMatch } = useContext(MatchContext);
  const read = async () => {
      const result = await getMatches();
      setMatches(result.data);
  }

  const create = async () => {
      const result = await createMatch();
      setNewMatches(result.data);
  }

  useEffect(() => {
    read();
  }, [matches]);

  return (
      <div>
        <h1>Liste des matchs</h1>
        <Button text="Créer un nouveau match" onClick={create} className="btn-primary" />
        <ul>
          {matches.map((match) => (
              <li key={match._id}>
                <p>Match ID: {match._id}</p>
                <p>Joueur 1: {match.user1.username}</p>
                <p>Joueur 2: {match.user2 ? match.user2.username : "En attente"}</p>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default MatchList;
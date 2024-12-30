import React, { useEffect } from "react";
import { useMatches } from "../hooks/useMatches";
import Button from "./Button";

function MatchList({ token }) {
  const { matches, fetchMatches, createNewMatch, loading, error } = useMatches(token);

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) return <p>Chargement des matchs...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
      <div>
        <h1>Liste des matchs</h1>
        <Button text="Créer un nouveau match" onClick={createNewMatch} className="btn-primary" />
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
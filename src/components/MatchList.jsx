import React, {useContext, useEffect, useState} from "react";
import Button from "./Button";
import {MatchContext} from "../context/MatchProvider.jsx";
import { Link } from "react-router-dom";

function MatchList() {
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
                <Link to={`/matches/${match._id}`}>Voir le match</Link>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default MatchList
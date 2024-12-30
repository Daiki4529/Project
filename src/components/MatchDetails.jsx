import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMatches } from "../hooks/useMatches";
import Button from "./Button";

function MatchDetails({ token }) {
    const { id } = useParams();
    const { match, fetchMatchById, playMove, loading, error } = useMatches(token);
    const [move, setMove] = useState("");

    useEffect(() => {
        fetchMatchById(id); // Charger les détails du match
    }, [id]);

    const handleMove = async (turnId) => {
        if (move) {
            await playMove(id, turnId, move);
            setMove("");
        }
    };

    if (loading) return <p>Chargement du match...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h1>Détails du match</h1>
            {match && (
                <div>
                    <p>Joueur 1: {match.user1.username}</p>
                    <p>Joueur 2: {match.user2 ? match.user2.username : "En attente"}</p>
                    <div>
                        <select value={move} onChange={(e) => setMove(e.target.value)}>
                            <option value="">Choisir un coup</option>
                            <option value="rock">Pierre</option>
                            <option value="paper">Papier</option>
                            <option value="scissors">Ciseaux</option>
                        </select>
                        <Button
                            text="Jouer"
                            onClick={() => handleMove(match.turns.length)}
                            className="btn-primary"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MatchDetails;
import { useState, useEffect } from "react";
import { getMatches, createMatch, getMatchById, playTurn } from "../services/matches";

export const useMatches = (token) => {
    const [matches, setMatches] = useState([]);
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMatches = async () => {
        setLoading(true);
        try {
            const data = await getMatches(token);
            setMatches(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchMatchById = async (matchId) => {
        setLoading(true);
        try {
            const data = await getMatchById(matchId, token);
            setMatch(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createNewMatch = async () => {
        setLoading(true);
        try {
            const newMatch = await createMatch(token);
            setMatches((prevMatches) => [...prevMatches, newMatch]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const playMove = async (matchId, turnId, move) => {
        setLoading(true);
        try {
            const updatedMatch = await playTurn(matchId, turnId, move, token);
            setMatch(updatedMatch);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        matches,
        match,
        loading,
        error,
        fetchMatches,
        fetchMatchById,
        createNewMatch,
        playMove,
    };
};
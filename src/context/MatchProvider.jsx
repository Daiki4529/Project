import React, {createContext} from "react";
import apiClient from "../api/apiClient.js";

export const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
    const getMatches = async () => {
        return await apiClient.get("/matches");
    }

    const getMatchById = async (matchId) => {
        return await apiClient.get(`/matches/${matchId}`);
    }

    const createMatch = async () => {
        return await apiClient.post("/matches");
    }

    const playTurn = async (matchId, turnId) => {
        return await apiClient.post(`/matches/${matchId}/turns/${turnId}`);
    }

    return (
        <MatchContext.Provider value={{ getMatches, getMatchById, createMatch, playTurn }}>
            {children}
        </MatchContext.Provider>
    );
};
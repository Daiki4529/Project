export async function getMatches(token) {
  console.log(token);
  try {
    const response = await fetch('http://fauques.freeboxos.fr:3000/matches', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error during matches fetching:", error);
    throw error;
  }
}

export async function getMatchById(matchId, token) {
  try {
    const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${matchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching match by ID:", error);
    throw error;
  }
}

export async function createMatch(token) {
  try {
    const response = await fetch('http://fauques.freeboxos.fr:3000/matches', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error during match creation:", error);
    throw error;
  }
}

export async function playTurn(matchId, turnId, move, token) {
  try {
    const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${matchId}/turns/${turnId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ move }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error playing turn:", error);
    throw error;
  }
}
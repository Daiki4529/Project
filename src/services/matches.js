export async function getMatches(token) {
  try {
    const response = await fetch("http://fauques.freeboxos.fr:3000/matches", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error during matches fetching:", error);
    throw error;
  }
}

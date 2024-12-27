import "react";
import Navbar from "../components/Navbar";
import MatchList from "../components/MatchList";

function MatchesPage() {
  return (
    <div>
      <Navbar />
      <h1>Matches</h1>
      <MatchList />
    </div>
  );
}

export default MatchesPage;

import Navbar from "../components/Navbar";
import pierreIcon from "../assets/rock.png";
import papierIcon from "../assets/paper.png";
import ciseauxIcon from "../assets/scissors.png";

function HomePage() {
  return (
    <div className="home-page">
      <div className="rules-container">
        <h1>Bienvenue sur Chifoumi !</h1>
        <div className="rules-content">
          <div className="game-rules">
            <h2>Règles du Jeu</h2>
            <div className="logos-container">
              <div className="logo-item">
                <img src={pierreIcon} alt="Pierre" />
                <p>Pierre</p>
              </div>
              <div className="logo-item">
                <img src={papierIcon} alt="Papier" />
                <p>Papier</p>
              </div>
              <div className="logo-item">
                <img src={ciseauxIcon} alt="Ciseaux" />
                <p>Ciseaux</p>
              </div>
            </div>
            <p>
              Le jeu Chifoumi (Pierre-papier-ciseaux) se joue entre deux
              joueurs. Chaque joueur choisit un coup : Pierre, Papier ou
              Ciseaux. Les règles sont simples
            </p>
            <div className="rules-description">
              <p>
                <strong>Pierre</strong> bat Ciseaux.
              </p>
              <p>
                <strong>Ciseaux</strong> bat Papier.
              </p>
              <p>
                <strong>Papier</strong> bat Pierre.
              </p>
              <p>
                Chaque partie se joue en trois manches. Le premier joueur à
                gagner deux manches gagne la partie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

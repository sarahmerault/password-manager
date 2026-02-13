import "../styles/header.css"
import { Link, useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprime le token JWT
        localStorage.removeItem("token");

        // Redirige vers login (accueil)
        navigate("/");

    };


    return (
        <header>
            <h2>Gestionnaire de mot de passe</h2>

            <nav>
                <Link to="/" className="nav-link">Accueil</Link>
                <Link to="/dashboard" className="nav-link">Tableau de bord</Link>
            </nav>

            <button onClick={handleLogout}>Déconnexion</button>
        </header>

    )
}

export default Header;
import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit =  async (e) => {
        e.preventDefault()
        try {
            const res = await API.post("/auth/login", { email, password })
            localStorage.setItem("token", res.data.token) // stocke le JWT
            alert("Connexion réussie !")
            navigate("/dashboard")
        } catch (err) {
            alert(err.response?.data?.message || "Erreur")
        }
    }  



    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Connexion</h2>

                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />

                <button type="submit">Se connecter</button>
                <p>Pas de compte ? {" "} <Link to="/register">S'inscrire</Link></p>
                
            </form>
        </div>
    )
}

export default Login;

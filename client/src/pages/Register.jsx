import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await API.post("/auth/register", { email, password })
            alert("Inscription réussi ! Connectez-vous.")
            navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || "Erreur")
        }   
    }


    return (
        <div className="container"> 
            <form onSubmit={handleSubmit}>
                <h2>S'inscrire</h2>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    )
}

export default Register;
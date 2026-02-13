import { useState, useEffect } from "react";
import API from "../services/api";



function PasswordForm({ onAdd, onUpdate, editingPassword, setEditingPassword }) {
    const [site, setSite] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // Si on clique sur "Modifier" on remplit le formulaire
    useEffect(() => {
        if (editingPassword) {
            setSite(editingPassword.site);
            setUsername(editingPassword.username);
            setEmail(editingPassword.email);
            setPassword(editingPassword.password);
        }
    }, [editingPassword]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (editingPassword) {
                // Update :
                const res = await API.put(`/passwords/${editingPassword.id}`, { site, username, email, password });

                onUpdate(res.data);
                setEditingPassword(null);

            } else {
                // Create :
                const res = await API.post("/passwords", { site, username, email, password });

                onAdd(res.data);
            }

            // Reset du formulaire
            setSite("");
            setUsername("");
            setEmail("");
            setPassword("");

        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'opération");
        }
    };

   

    return (
        <form onSubmit={handleSubmit}>
            <h2>
                {editingPassword ? "Modifier le mot de passe" : "Ajouter un mot de passe"}  
            </h2>

            <input placeholder="Site" value={site} onChange={e => setSite(e.target.value)} required />

            <input placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} />

            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

            <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />

            <button type="submit">
                {editingPassword ? "Mettre à jour" : "Ajouter"} 
            </button>

            {editingPassword && (
                <button type="button" onClick={() => {
                    setEditingPassword(null); 
                    setSite("");
                    setUsername("");
                    setEmail("");
                    setPassword("");
                  }}
                >Annuler</button>
            )}
        </form>
    );
}

export default PasswordForm;
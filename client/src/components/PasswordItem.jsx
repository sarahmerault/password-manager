import { useState } from "react";

function PasswordItem({ password, onDelete, onEdit}) {
    const [visible, setVisible] = useState(false)


    return (
        <div className="password-item">
            <p><strong>Site :</strong> {password.site}</p>
            <p><strong>Utilisateur :</strong> {password.username}</p>
            <p><strong>Email :</strong> {password.email}</p>

            <p>
                <strong>Mot de passe :</strong>{" "}
                {visible ? password.password : ""}
            </p>

            <div className="buttons">
                <button onClick={() => setVisible(!visible)}>
                    {visible ? "Masquer" : "Afficher"}
                </button>

                <button onClick={() => onDelete(password.id)}>
                    Supprimer
                </button>

                <button onClick={() => onEdit(password)}>
                    Modifier
                </button>
            </div>
            
        </div>
    )
}

export default PasswordItem;
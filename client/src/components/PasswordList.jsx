import PasswordItem from "./PasswordItem"

function PasswordList({ passwords, onDelete, onEdit}) {
    if (passwords.length === 0) {
        return <p>Aucun mot de passe enregistré</p>
    }


    return (
        <div className="password-list">
            <h2> Mots de passe</h2>

            {passwords.map(p => ( 
                <PasswordItem key={p.id} password={p} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    )
}

export default PasswordList;
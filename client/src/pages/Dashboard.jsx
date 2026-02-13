import { useEffect, useState } from "react";  
import API from "../services/api";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";



function Dashboard() {
    const [passwords, setPasswords] = useState([]);
    const [editingPassword, setEditingPassword] = useState(null);



    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                const res = await API.get("/passwords")
                setPasswords(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchPasswords()
    }, [])



    // Fonction pour ajouter un mot de passe
    const addPassword = (newPassword) => {
        setPasswords([...passwords, newPassword])
    }


    // Fonction pour modifier un mot de passe
    const updatePassword = (updatedPassword) => {
        setPasswords(passwords.map(p =>
            p.id === updatedPassword.id ? updatedPassword : p ));
    };


    // Fonction pour supprimer un mot de passe
    const deletePassword = async (id) => {
        try {
            await API.delete(`/passwords/${id}`)
            setPasswords(passwords.filter(p => p.id !== id))         
        } catch (err) {
            console.error(err)
        }
    };

    const handleEdit = (password) => {
        setEditingPassword(password);
    };


    return (
        <div className="container">
            <h1>Tableau de bord</h1>

            <PasswordForm onAdd={addPassword} onUpdate={updatePassword} editingPassword={editingPassword} setEditingPassword={setEditingPassword} />
            <PasswordList passwords={passwords} onDelete={deletePassword} onEdit={handleEdit}/>
        </div>  
    )
}

export default Dashboard;
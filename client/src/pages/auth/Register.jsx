
import { useNavigate } from 'react-router-dom'
import Form from '../../components/Form'

const Register = () => {
 const navigate = useNavigate()
        //CORELATION AVEC LA DB 
    const fields =[
       
        {
            name: "email",
            label: "Email",
            type: "email",
            validation: { required: "Email requis" }
            
        },

        {
            name: "password",
            label: "Mot de passe",
            type: "password",
            validation: { required: " Mot de pass requis" }
            

        },
        {
            name: "confirmPassword",
            label: "Confirmer votre mot de passe",
            type: "confirmPassword",
            validation: { required: "Confirmation du mot de pass requis" }
            
        },
       


    ]


    
    //FONCTION POUR ENREGISTRER LES DATA  ON SUBMITE 
    const onSubmit = async (data)=>{

            //GERER LES ERREUR 
        try {
            await api.post('?????????????',data)
            alert('votre compte a ete crée ')
            navigate('/login')
            
        } catch (error) {
            console.error(error)
            //requete fetch , erreur
            alert(error.response?.data?.message)
            
        }
    }
  return (
    
    <Form inputs={fields} onSubmit={onSubmit} submitLabel={`s'inscrire`}/>
    
  )
}

export default Register
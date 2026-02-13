
import { useNavigate } from 'react-router-dom'
import Form from '../../components/Form'

const Login = () => {
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
            
        }
       


    ]


    
    //FONCTION POUR ENREGISTRER LES DATA  ON SUBMITE 
    const onSubmit = async (data)=>{
     
            //GERER LES ERREUR 
        try {
            await api.post('???????',data)
            navigate('/dashboard')
            
        } catch (error) {
            console.error(error)
            //requete fetch , erreur
            alert(error.response?.data?.message)
            
        }
    }
  return (
    <Form inputs={fields} onSubmit={onSubmit} modifyLabel={`modifier`} submitLabel={`se connecter`}/>
    
  )
}

export default Login
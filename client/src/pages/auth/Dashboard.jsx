import Password_manager from "../../components/Password_manager"

const Dashboard = () => {

        //CORELATION AVEC LA DB 
    const fields =[
        {
            
            name: "email",
            label: "Email/Username",
            type: "email",
            validation: { required: "Email requis" }
        },

        {
            name: "password",
            label: "Mot de passe",
            type: "password",
            validation: { required: "requis" }
            

        },
        {
            name: "confirmPassword",
            label: "",
            type: "confirmPassword",
            validation: { required: "Confirmation du mot de pass requis" }
            
        },
       


    ]


    
    //FONCTION POUR ENREGISTRER LES DATA  ON SUBMITE 
    const onSubmit = async (data)=>{

            //GERER LES ERREUR 
        try {
            await api.get('?????????????',data)
            alert('votre compte a ete crée ')
            
        } catch (error) {
            console.error(error)
            //requete fetch , erreur
            alert(error.response?.data?.message)
            
        }
    }


    const getElement = ()=>{

        const element = [
           
        ]
    }




function searchElement() {

  const [search, setSearch] = useState("");

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <hr />
      <ul>
        {drinksData
          .filter((elem) => elem.toLowerCase().includes(search.toLowerCase()))
          .map((elem) => {
            return <li>{elem}</li>;
          })}
      </ul>
    </>
  );
}


  return (<>





    <Password_manager inputs={fields} onSearch={searchElement} onSubmit={onSubmit} modifyLabel={`modifier`} submitLabel={`????`}/>

    
    </>
    
  )
}

export default Dashboard
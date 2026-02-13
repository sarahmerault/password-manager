import {useForm} from "react-hook-form"

const Password_manager = ({inputs,onSubmit,submitLabel,modifyLabel}) => {

     //STRUCTURE DE react-hook-form  POUR UN FORM
    const {register,handleSubmit,formState:{errors}} = useForm()

 return (
    //structure form du password manager
   
    <form  onSubmit={handleSubmit(onSubmit)}>
       {manager.map((



       ))}




       {inputs.map((input_manager)=>(

    
        <div key={input_manager.name}>
        

            <label>{input_manager.label}</label>

            <input type={input_manager.type} {...register(input_manager.name,input_manager.validation)}/>
            
            {errors[input_manager.name]&&(<p>{errors[input_manager.name].message}</p> )}

        </div>
       ))}

<button type ="submit">{submitLabel}</button>
<button type ="submit">{modifyLabel}</button>
    </form>
   
  )
}
export default Password_manager

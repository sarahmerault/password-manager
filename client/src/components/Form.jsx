
import{useForm} from "react-hook-form"


const Form = ({inputs, onSubmit,submitLabel}) => {


     const {register,handleSubmit,formState:{errors}} = useForm()


  return (
 
    <form  onSubmit={handleSubmit(onSubmit)}>
       { inputs.map((input)=>()
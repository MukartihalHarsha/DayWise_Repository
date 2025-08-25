import React,{useState} from 'react'

const Multiple=()=>{
    const [formData,setFormData]=useState({name:'',email:'',message:''})

    const handleChange=(event)=>{
        const{name,value}=event.target

setFormData((prevFormData)=>({
    ...prevFormData,[name]:value
}))    
}



const handleSubmit=(event)=>{
    event.preventDefault();
    alert(`Name: ${formData.name}, Email: ${formData.email}, Message:${formData.message}`)
}
return(
    <div>
        <h2>Multiple Form Controlled Component</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' value={formData.name} 
            onChange={handleChange}/><br/>

            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={formData.email} 
            onChange={handleChange}/><br/>

            <label htmlFor='message'>Message</label>
            <textarea id='message' name='message' value={formData.message} 
            onChange={handleChange}/><br/>

            <button type='submit'>Submit</button>
        </form>
    </div>
)
}
export default Multiple
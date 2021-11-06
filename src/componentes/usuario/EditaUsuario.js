import React,{useState} from "react";
import  {cabeceras,API_USUARIO} from "../../store/constante"
import axios from "axios";
function EditarUsuario(props){
    const [usuario,setUsuario]=useState(props.usuario)
    const [contrasena,setContrasena] = useState("")
    
    const editarusuario=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_USUARIO+"/"+usuario.Documento;
        const body={
            Documento:usuario.Documento,
            Nombre:usuario.Nombres,
            Apellido:usuario.Apellidos,
            Telefono:usuario.Telefono,
            Direccion:usuario.Direccion,
            Fecha_de_nacimiento:usuario.Fecha_de_nacimient,
            Email:usuario.Email,
            Contraseña:contrasena
        }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("El usuario no fue editado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        if(prop==="Contraseña"){
            setContrasena(event.target.value)
        }else{
            setUsuario({...usuario,[prop]:event.target.value})
        }
    }
    return(
        <div>
            <div>
                <h2>Actualizar Usuario </h2>
            </div>
            <form onSubmit={editarusuario}>
                    <label>Documento</label>
                    <input type="text" value={usuario.Documento} onChange={handleChange("Documento")}></input>
                    <label>Nombre</label>
                    <input type="text" value={usuario.Nombres} onChange={handleChange("Nombres")}></input>
                    <label>Apellido </label>
                    <input type="text" value={usuario.Apellidos} onChange={handleChange("Apellidos")}></input> 
                    <label>Telefono</label>
                    <input type="text" value={usuario.Telefono} onChange={handleChange("Telefono")} ></input>
                    <label>Direccion</label>
                    <input type="text" value={usuario.Direccion} onChange={handleChange("Direccion")}></input>
                    <label>Fecha de nacimiento	</label>
                    <input type="text" value={usuario.Fecha_de_nacimient} onChange={handleChange("Fecha Nacimiento")}></input>
                    <label>Email </label>
                    <input type="text" value={usuario.Email} onChange={handleChange("Email")}></input> 
                    <label>Contraseña</label>
                    <input type="password" value={contrasena} onChange={handleChange("Contraseña")} ></input>
                    <button  type="submit"> Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
                </form>
        </div>
    )
}
export default EditarUsuario;
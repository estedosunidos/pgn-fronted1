import React,{useState,useEffect} from "react";
import  {API_PERFIL,cabeceras,API_USUARIO} from "../../store/constante"
import axios from "axios";
function CrearUsuario(props){
    const [usuario,setUsuario]=useState({})
    const [perfiles,setPerfiles]=useState([])

    
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_PERFIL;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setPerfiles(repuesta.data);
        })
    },[]);

    const crearusuario=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_USUARIO;
        const body={
            Documento:usuario.Documento,
            Nombre:usuario.Nombre,
            Apellido:usuario.Apellido,
            Telefono:usuario.Telefono,
            Direccion:usuario.Direccion,
            Fecha_de_nacimiento:usuario.Fecha_de_nacimiento,
            Email:usuario.Email,
            Nombre_de_Usuario:usuario.Nombre_de_Usuario,
            Contraseña:usuario.Documento,
            Perfil:usuario.Perfil
        }
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("El usuario no fue creado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{      
        setUsuario({...usuario,[prop]:event.target.value})
    }
    return(
        <div>
            <div>
                <h2>Registrar Usuario </h2>
            </div>
            <form onSubmit={crearusuario}>
                    <label>Documento</label>
                    <input type="text" value={usuario.Documento} onChange={handleChange("Documento")}></input>
                    <label>Nombre</label>
                    <input type="text" value={usuario.Nombre} onChange={handleChange("Nombre")}></input>
                    <label>Apellido </label>
                    <input type="text" value={usuario.Apellido} onChange={handleChange("Apellido")}></input> 
                    <label>Telefono</label>
                    <input type="text" value={usuario.Telefono} onChange={handleChange("Telefono")} ></input>
                    <label>Direccion</label>
                    <input type="text" value={usuario.Direccion} onChange={handleChange("Direccion")}></input>
                    <label>Fecha de nacimiento	</label>
                    <input type="date" value={usuario.Fecha_de_nacimiento} onChange={handleChange("Fecha_de_nacimiento")}></input>
                    <label>Email </label>
                    <input type="text" value={usuario.Email} onChange={handleChange("Email")}></input> 
                    <label>Perfil</label>
                    <select name="perfiles" onChange={handleChange("Perfil")}>
                        <option value=" " disabled selected>seleccione</option>
                        {perfiles.map((perfil,index)=>{
                            return <option key={index} value={perfil.idperfil}>{perfil.descricion}</option>
                        })}
                    </select>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearUsuario;
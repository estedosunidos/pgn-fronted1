import React,{useState} from "react";
import  {API_UBICACION,cabeceras} from "../../store/constante"
import axios from "axios";
function CrearUbicacion(props){
    const [ubucacion,setUbicacion]=useState({})
    const crearubucacion=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_UBICACION;
        const body={
            Capacidad:ubucacion.Capacidad,
            Direccion:ubucacion.Direccion
        }
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        }) 
        .catch(error=>{
            alert("La ubicacion no fue creado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setUbicacion({...ubucacion,[prop]:event.target.value})
    }
    return(
        <div>
            <div>
                <h2>Crear  ubicacion</h2>
            </div>
            <form onSubmit={crearubucacion}>
                    <div>
                        <label>Registra Ubicaciones</label>
                    </div>
                    <label>Capacidad</label>
                    <input type="text" value={ubucacion.Capacidad} onChange={handleChange("Capacidad")}></input>
                    <label>Direccion</label>
                    <input type="text" value={ubucacion.Direccion} onChange={handleChange("Direccion")}></input>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>

        </div>
    )
}
export default CrearUbicacion;
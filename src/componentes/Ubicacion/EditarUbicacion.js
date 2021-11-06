import axios from "axios";
import React,{useState} from "react";
import  {API_UBICACION,cabeceras} from "../../store/constante"
function  EditarUbicacion(props){
    const [ubicacion,setUbicacion]= useState(props.ubicacion)
    const  handleChange=(prop)=>(event)=>{
        setUbicacion({...ubicacion,[prop]:event.target.value})

    };
    const editarubicacion=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_UBICACION+"/"+ubicacion.Id;
        
        const body={
            Capacidad:ubicacion.Capacidad,
            Direccion:ubicacion.Ubicacion
            }
        console.log(JSON.stringify(body))
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        }
        )
        .catch(error=>{
            alert("Se ha presentado un error")
            console.log(error)
        })

    })
    return(
        <div>
            <h2>Editar ubicacion</h2>
            <div>
                <form onSubmit={editarubicacion}>
                <div>
                        <label>Actualizar  Ubicaciones</label>
                    </div>
                    <label>Capacidad</label>
                    <input type="text" value={ubicacion.Capacidad} onChange={handleChange("Capacidad")}></input>
                    <label>Direccion</label>
                    <input type="text" value={ubicacion.Ubicacion} onChange={handleChange("Ubicacion")}></input>
                    <button  type="submit"> Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
                </form>

            </div>
        </div>
    )
}
export  default EditarUbicacion;
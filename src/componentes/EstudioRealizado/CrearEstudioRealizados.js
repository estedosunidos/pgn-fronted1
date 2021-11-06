import axios from "axios";
import React,{useState} from "react";
import  {API_ESTUDIOSREALIZADO,cabeceras} from "../../store/constante"
function CrearEstudioRealizados(props){
    const [estudiorealizado,setEstudiorealizado]=useState({})
    const crearestudiorealziado=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ESTUDIOSREALIZADO;
        const body={
            Grado_Academico:estudiorealizado.Grado_Academico,
            Universidad:estudiorealizado.Universidad,
            idDocente:props.docente["idDocente"]
        }
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("El estudio realizado  no fue creada")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setEstudiorealizado({...estudiorealizado,[prop]:event.target.value})
    }
    return(
        <div>
                <form onSubmit={crearestudiorealziado}>
                    <div>
                    <label>Registra estudio realizado de docente</label>
                    </div>
                    <label>Grado Academico</label>
                    <input type="text" value={estudiorealizado.Grado_Academico} onChange={handleChange("Grado_Academico")}></input>
                    <label>Universidad </label>
                    <input type="text" value={estudiorealizado.Universidad} onChange={handleChange("Universidad")}></input> 
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearEstudioRealizados
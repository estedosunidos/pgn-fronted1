import axios from "axios";
import React,{useState} from "react";
import  {API_ESTUDIOSREALIZADO,cabeceras} from "../../store/constante"
function Editarestudiorealizados(props){
    const [estudiorealizado,setEstudiorealizado]=useState(props.estudiorealizado)
    const editarestudiorealizado=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ESTUDIOSREALIZADO+"/"+estudiorealizado.Id;
        const body={
            Grado_Academico:estudiorealizado["Grado Academico"],
            Universidad:estudiorealizado["Universidad"],
            idDocente:props.docente["idDocente"]
        }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("El estudio realizado  no fue editado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setEstudiorealizado({...estudiorealizado,[prop]:event.target.value})
    }
    return(
        <div>
                <form onSubmit={editarestudiorealizado}>
                    <div>
                    <label>Editar el estudio realizado del docente</label>
                    </div>
                    <input type="text" value={estudiorealizado["Grado Academico"]} onChange={handleChange("Grado Academico")}></input>
                    <label>Universidad </label>
                    <input type="text" value={estudiorealizado["Universidad"]} onChange={handleChange("Universidad")}></input> 
                    <button  type="submit"> Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default Editarestudiorealizados
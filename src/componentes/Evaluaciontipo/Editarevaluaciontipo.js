import React,{useEffect,useState} from "react";
import  {API_EVALUACIONTIPO,cabeceras} from "../../store/constante"
import axios from "axios";
function Editarevaluaciontipo(props){
    const [evaluaciontipo,setEvaluaciontipo]=useState({})
    const editarplanevaluacion=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_EVALUACIONTIPO;
        const body={
            Descripcion:evaluaciontipo.Descripcion
        }
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        }) 
        .catch(error=>{
            alert("El evaluacion tipo no fue editado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setEvaluaciontipo({...evaluaciontipo,[prop]:event.target.value})
    }
    return(
        <div>
            <form onSubmit={editarplanevaluacion}>
                    <label>Descripcion</label>
                    <input type="text" value={evaluaciontipo.Descripcion} onChange={handleChange("Descripcion")}></input>
                    <button  type="submit"> editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>

        </div>
    )
}
export default Editarevaluaciontipo
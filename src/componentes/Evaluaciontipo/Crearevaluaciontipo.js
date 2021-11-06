import React,{useEffect,useState} from "react";
import  {API_EVALUACIONTIPO,cabeceras} from "../../store/constante"
import axios from "axios";
function Crearevaluaciontipo(props){
    const [evaluaciontipo,setEvaluaciontipo]=useState({})
    const crearplanevaluacion=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_EVALUACIONTIPO;
        const body={
            Descripcion:evaluaciontipo.Descripcion
        }
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        }) 
        .catch(error=>{
            alert("El evaluacion tipo no fue creado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setEvaluaciontipo({...evaluaciontipo,[prop]:event.target.value})
    }
    return(
        <div>
            <form onSubmit={crearplanevaluacion}>
                    <label>Descripcion</label>
                    <input type="text" value={evaluaciontipo.Descripcion} onChange={handleChange("Descripcion")}></input>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>

        </div>
    )
}
export default Crearevaluaciontipo
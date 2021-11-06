import axios from "axios";
import React,{useState} from "react";
import  {API_PERIODO,cabeceras} from "../../store/constante"
function Crearperiodo(props){
    const [periodo,setPeriodo]=useState(props.periodo)
    const crearperiodo=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_PERIODO
        console.log(url)
        const body={
            Descripcion:periodo.Descripcion,
            year:periodo.year,
            Fecha_Inicio:periodo["Fecha_Inicio"],
            Fecha_Final:periodo["Fecha_Final"]
        }
        console.log("hhhhh",JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        }
        )
        .catch(error=>{
            alert("Se ha presentado un error")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setPeriodo({...periodo,[prop]:event.target.value})
    }
    return(
        <div>
             <h1>CrearPeriodo</h1>
            <form onSubmit={crearperiodo}>
            <label>Descripcion</label>
            <input type="text" value={periodo.Descripcion} onChange={handleChange("Descripcion")}></input>
            <label>Años</label>
            <input type="text" value={periodo.year} onChange={handleChange("year")}></input>
            <label>Fecha Inicia</label>
            <input type="date" value={periodo["Fecha_Inicio"]} onChange={handleChange("Fecha_Inicio")}></input>
            <label>Fecha Final</label>
            <input type="date" value={periodo["Fecha_Final"]} onChange={handleChange("Fecha_Final")}></input>
            <button  type="submit"> Crear</button>
            <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default Crearperiodo
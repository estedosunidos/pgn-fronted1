import axios from "axios";
import React,{useState} from "react";
import  {API_PERIODO,cabeceras} from "../../store/constante"
function EditarPeriodo(props){
    const [periodo,setPeriodo]=useState(props.periodo)
    const  handleChange=(prop)=>(event)=>{
        setPeriodo({...periodo,[prop]:event.target.value})

    };
    const editarperiodo=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_PERIODO+"/"+periodo.IdPeriodo
        const body={
            Descripcion:periodo.Descripcion,
            year:periodo.year,
            Fecha_Inicio:periodo.Fecha_Inicio,
            Fecha_Final:periodo.Fecha_Final
        }
        console.log(JSON.stringify(body));
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
            <h1>EditarPeriodo</h1>
            <form onSubmit={editarperiodo}>
            <label>Descripcion</label>
            <input type="text" value={periodo.Descripcion} onChange={handleChange("Descripcion")}></input>
            <label>Años</label>
            <input type="text" value={periodo.year} onChange={handleChange("year")}></input>
            <label>Fecha Inicia</label>
            <input type="date" value={periodo.Fecha_Inicio} onChange={handleChange("Fecha_Inicio")}></input>
            <label>Fecha Final</label>
            <input type="date" value={periodo.Fecha_Final} onChange={handleChange("Fecha_Final")}></input>
            <button  type="submit"> Editar</button>
            </form>
        </div>
    )
}
export default EditarPeriodo
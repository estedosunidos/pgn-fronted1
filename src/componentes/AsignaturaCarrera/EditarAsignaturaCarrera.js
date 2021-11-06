import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_ASIGNATURACARRERA,cabeceras,API_ASIGNATURA} from "../../store/constante"
function CrearAsignaturaDocente(props){
    const [asignacioncarrera,setAsignacioncarrera]=useState({Id:""})
    const [asignaturas,setAsignaturas]=useState([])
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAsignaturas(repuesta.data);
        })
    },[]);
    const editarAsignaturaCarrera=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURACARRERA+"/"+props.asignaturacarrera.Id;
        const body={
            IdAsignatura:asignacioncarrera.Asignatura,
            IdCarrera:props.carrera.Id

        }
        console.log(JSON.stringify(body));
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("La asignatura no fue editada ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setAsignacioncarrera({...asignacioncarrera,[prop]:event.target.value})
    }
    return(
        <div>
                <form onSubmit={editarAsignaturaCarrera}>
                <label>Asignatura</label>
                <select name="asignaturas" defaultValue=" " onChange={handleChange("IdAsignatura")}>
                        <option value=" " disabled selected>seleccione</option>
                        {asignaturas.map((asignatura,index)=>{
                            return <option key={index} value={asignatura.Id} selected={asignatura.Id ==asignacioncarrera.IdAsignatura ? true : false}>{asignatura.Asignatura}</option>   
                        })}IdAsignatura
                        </select>
                    <button  type="submit">Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearAsignaturaDocente
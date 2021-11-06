import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_ASIGNACIONDOCENTE,cabeceras,API_ASIGNATURA} from "../../store/constante"
function CrearAsignaturaDocente(props){
    const [asignaciondocente,setAsignaciondocente]=useState({Id:""})
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState({})
    const [docente,setDocente]=useState({})
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAsignaturas(repuesta.data);
        })
    },[]);
    const editarAsignaturaDocentes=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ASIGNACIONDOCENTE+"/"+props.asignaciondocente.Id;
        console.log(props.docente)
        const body={
            IdDocente:props.docente["idDocente"],
            IdAsignatura:asignaciondocente.Asignatura

        }
        console.log(JSON.stringify(body));
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("La asignacion de la asignatura al docente no fue editada ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setAsignaciondocente({...asignaciondocente,[prop]:event.target.value})
    }
    return(
        <div>
                <form onSubmit={editarAsignaturaDocentes}>
                <div>
                <label> Editar la asignacion del docente </label>
                </div>
                <label>Asignatura</label>
                <select name="asignaturas" defaultValue=" " onChange={handleChange("Id")}>
                        <option value=" " disabled>seleccione</option>
                        {asignaturas.map((asignatura,index)=>{
                            return <option key={index} value={asignatura.Id} selected={asignatura.Id == asignaciondocente.Id ? true : false}>{asignatura.Carreras}</option>   
                        })}
                        </select>
                    <button  type="submit"> Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearAsignaturaDocente
import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_ASIGNACIONDOCENTE,cabeceras,API_ASIGNATURA} from "../../store/constante"
function CrearAsignaturaDocente(props){
    const [asignaciondocente,setAsignaciondocente]=useState({})
    const [asignaturas,setAsignaturas]=useState([])
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAsignaturas(repuesta.data);
        })
    },[]);
    const crearAsignaturaDocentes=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ASIGNACIONDOCENTE;
        const body={
            IdDocente:props.docente["idDocente"],
            IdAsignatura:asignaciondocente.Asignatura

        }
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("La asignacion de la asignatura al docente no fue asociada ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setAsignaciondocente({...asignaciondocente,[prop]:event.target.value})
    }
    return(
        <div>
                <form onSubmit={crearAsignaturaDocentes}>
                <div>
                <label>Asignarle la asignatura al docente</label>
                </div>
                <label>Asignatura</label>
                <select name="asignaturas" defaultValue=" " onChange={handleChange("Asignatura")}>
                        <option value=" " disabled selected>seleccione</option>
                        {asignaturas.map((asignatura,index)=>{
                            return <option key={index} value={asignatura.Id}>{asignatura.Asignatura}</option>
                        })}
                        </select>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearAsignaturaDocente
import React,{useState,useEffect} from "react";
import  {API_ASIGNACIONDOCENTE,cabeceras,API_DOCENTE} from "../../store/constante"
import axios from "axios";
import CrearAsignaturaDocente  from "./CrearAsignaturaDocente"
import EditarAsisgnacionDocente  from "./EditarAsisgnacionDocente"
import Table from "../Table"
function AsignacionDocente(props){
    const [editar,setEditar]=useState(false)
    const [appState,setAppState]=useState(false)
    const [asignaciondocentes,setAsignaciondocentes]=useState([])
    const [asignaciondocente,setAsignaciondocente]=useState({})
    const [crear,setCrear]=useState(false)
    useEffect(()=>{
        const url = process.env.REACT_APP_API_URL+API_DOCENTE+"/"+props.docente.idDocente
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            if(repuesta.data.length>0){
                setAsignaciondocentes(repuesta.data[0]["AsignaturaDocente"])
            }
        })
    },[appState]);
    const mostracrearasignaciondocentes=(()=>{
        setCrear(true)
    })
    const crearasignaciondocente=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const mostraeditarasignaciondocente=((asignaciondocente)=>{
         setEditar(true)
         setAsignaciondocente(asignaciondocente)
    });
    const borrarasignaciondocente=((asignaciondocente)=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNACIONDOCENTE+"/"+asignaciondocente.Id;
        console.log(url)
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("la asignatura del docenete no fue eliminado ")
        })
    }
    );
    const editaasignaciondocente=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    return(
        <div>
        <label>Asignacion de asignartura</label>
        <button onClick={mostracrearasignaciondocentes}>Nuevo</button>
        <Table data={asignaciondocentes} borrar={borrarasignaciondocente} mostrar={mostraeditarasignaciondocente}></Table>
        {crear && <CrearAsignaturaDocente docente={props.docente} cancelar={cancelar} crear={crearasignaciondocente}></CrearAsignaturaDocente>}
        {editar && <EditarAsisgnacionDocente cancelar={cancelar}  docente={props.docente} asignaciondocente={asignaciondocente} editar={editaasignaciondocente}> </EditarAsisgnacionDocente>}
    </div>
    )
}
export default AsignacionDocente
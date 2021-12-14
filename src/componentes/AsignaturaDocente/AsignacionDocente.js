import React,{useState,useEffect} from "react";
import  {API_ASIGNACIONDOCENTE,cabeceras,API_DOCENTE} from "../../store/constante"
import axios from "axios";
import CrearAsignaturaDocente  from "./CrearAsignaturaDocente"
import EditarAsisgnacionDocente  from "./EditarAsisgnacionDocente"
import TableCustom from "../TableCustom"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
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
        <button onClick={mostracrearasignaciondocentes}>Nuevo</button>
        <TableCustom data={asignaciondocentes} borrar={borrarasignaciondocente} mostrar={mostraeditarasignaciondocente}></TableCustom>
        {editar && <EditarAsisgnacionDocente showModal={editar} cancelar={cancelar}  docente={props.docente} asignaciondocente={asignaciondocente} editar={editaasignaciondocente}> </EditarAsisgnacionDocente>}
        {crear && <CrearAsignaturaDocente showModal={crear} docente={props.docente} cancelar={cancelar} crear={crearasignaciondocente}></CrearAsignaturaDocente>}  


    </div>
    )
}
export default AsignacionDocente
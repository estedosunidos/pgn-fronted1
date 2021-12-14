import React,{useState,useEffect} from "react";
import  {API_ASIGNATURACARRERA,cabeceras,API_CARRERA} from "../../store/constante"
import axios from "axios";
import CrearAsignaturaCarrera  from "./CrearAsignaturaCarrera"
import EditarAsignaturaCarrera  from "./EditarAsignaturaCarrera"
import TableCustom from "../TableCustom"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function AsignaturaCarrera(props){
    const [editar,setEditar]=useState(false)
    const [appState,setAppState]=useState(false)
    const [asignaturacarreras,setAsignaturacarreras]=useState([])
    const [asignaturacarrera,setAsignaturacarrera]=useState({})
    const [crear,setCrear]=useState(false)
    useEffect(()=>{
        const url = process.env.REACT_APP_API_URL+API_CARRERA+"/"+props.carrera.Id
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            if(repuesta.data.length>0){
                setAsignaturacarreras(repuesta.data[0]["AsignaturaCarrera"])
            }
        })
    },[appState]);
    const mostracrearasignaturacarrera=(()=>{
        setCrear(true)
    })
    const crearasignaturacarrera=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const mostraeditarasignaturacarrera=((asignaturacarrera)=>{
         setEditar(true)
         setAsignaturacarrera(asignaturacarrera)
    });
    const borrarasignaturacarrera=((asignaturacarrera)=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURACARRERA+"/"+asignaturacarrera.Id;
        console.log(url)
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("la asignatura de la carrera no fue eliminado ")
        })
    }
    );
    const editaasignaturacarrera=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    return(
        <div>
        <label>Asignacion de asignartura en el plan de estudio de la carrera</label>
        <button onClick={mostracrearasignaturacarrera}>Nuevo</button>
        <TableCustom data={asignaturacarreras} borrar={borrarasignaturacarrera} mostrar={mostraeditarasignaturacarrera}></TableCustom>
        {crear && <CrearAsignaturaCarrera showModal={crear} carrera={props.carrera} cancelar={cancelar} crear={crearasignaturacarrera}></CrearAsignaturaCarrera>}
        {editar && <EditarAsignaturaCarrera showModal={editar} cancelar={cancelar}  carrera={props.carrera} asignaturacarrera={asignaturacarrera} editar={editaasignaturacarrera}> </EditarAsignaturaCarrera>}
    </div>
    )
}
export default AsignaturaCarrera
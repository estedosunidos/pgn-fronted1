import React,{useState,useEffect} from "react";
import  {API_ESTUDIOSREALIZADO,cabeceras,API_DOCENTE} from "../../store/constante"
import axios from "axios";
import CrearEstudioRealizados  from "./CrearEstudioRealizados"
import EditarEstudioRealizado  from "./Editarestudiorealizados"
import TableCustom from "../TableCustom"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
function EstudioRealizado(props){
    const [editar,setEditar]=useState(false)
    const [appState,setAppState]=useState(false)
    const [estudiosrealizados,setEstudiosrealizados]=useState([])
    const [estudiorealizado,setEstudiorealizado]=useState({})
    const [crear,setCrear]=useState(false)
    useEffect(()=>{
        const url = process.env.REACT_APP_API_URL+API_DOCENTE+"/"+props.docente.idDocente
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            if(repuesta.data.length>0){
                setEstudiosrealizados(repuesta.data[0]["EstudiosRealizados"])
            }
        })
    },[appState]);
    const mostracrearestudiorealizado=(()=>{
        setCrear(true)
    })
    const crearestudiorealizado=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const mostraeditarestudiorealizado=((estudiorealizado)=>{
         setEditar(true)
         setEstudiorealizado(estudiorealizado)
    });
    const borrarestudiorealizado=((estudiorealizado)=>{
        const url=process.env.REACT_APP_API_URL+API_ESTUDIOSREALIZADO+"/"+estudiorealizado.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("El estudio realizado no fue eliminado ")
        })
    }
    );
    const editaestudiorealizado=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    return(
        <div>
        <label>Experencia academica</label>
        <button onClick={mostracrearestudiorealizado}>Nuevo</button>
        <TableCustom data={estudiosrealizados} borrar={borrarestudiorealizado} mostrar={mostraeditarestudiorealizado}></TableCustom>
        {crear && <CrearEstudioRealizados  showModal={crear} docente={props.docente} cancelar={cancelar} crear={crearestudiorealizado}></CrearEstudioRealizados>}
        {editar && <EditarEstudioRealizado  showModal={editar} cancelar={cancelar} docente={props.docente} estudiorealizado={estudiorealizado} editar={editaestudiorealizado}> </EditarEstudioRealizado>}
    </div>
    )
}
export default EstudioRealizado
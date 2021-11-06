import React,{useState,useEffect} from "react";
import  {API_ASIGNATURACARRERA,cabeceras,API_CARRERA} from "../../store/constante"
import axios from "axios";
import CrearAsignaturaCarrera  from "./CrearAsignaturaCarrera"
import EditarAsignaturaCarrera  from "./EditarAsignaturaCarrera"
import Table from "../Table"
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
        <Table data={asignaturacarreras} borrar={borrarasignaturacarrera} mostrar={mostraeditarasignaturacarrera}></Table>
        {crear && <CrearAsignaturaCarrera carrera={props.carrera} cancelar={cancelar} crear={crearasignaturacarrera}></CrearAsignaturaCarrera>}
        {editar && <EditarAsignaturaCarrera cancelar={cancelar}  carrera={props.carrera} asignaturacarrera={asignaturacarrera} editar={editaasignaturacarrera}> </EditarAsignaturaCarrera>}
    </div>
    )
}
export default AsignaturaCarrera
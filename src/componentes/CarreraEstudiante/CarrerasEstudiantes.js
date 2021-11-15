import React,{useState,useEffect} from "react";
import  {API_CARRERAESTUDIANTE,cabeceras,API_ESTUDIANTE} from "../../store/constante"
import axios from "axios";
import CrearCarrerasEstudiantes  from "./CrearCarrerasEstudiantes"
import EditarCarreraEstudiante  from "./EditarCarreraEstudiante"
import TableCustom from "../TableCustom"
function CarreraEstudiantes(props){
    const [editar,setEditar]=useState(false)
    const [appState,setAppState]=useState(false)
    const [carreraestudiantes,setCarreraestudiantes]=useState([])
    const [carreraestudiante,setCarreraestudiante]=useState({})
    const [crear,setCrear]=useState(false)
    useEffect(()=>{
        const url = process.env.REACT_APP_API_URL+API_ESTUDIANTE+"/"+props.estudiante.idEstudiantes
        console.log(JSON.stringify(props))
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            if(repuesta.data.length>0){
                setCarreraestudiantes(repuesta.data[0]["Carreras"])
            }
        })
    },[appState]);
    const mostracrearcarreraestudiante=(()=>{
        setCrear(true)
    })
    const crearcarreraestudiante=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const mostraeditarcarreraestudiante=((carreraestudiante)=>{
         setEditar(true)
         setCarreraestudiante(carreraestudiante)
    });
    const borrarasignaciondocente=((carreraestudiante)=>{
        const url=process.env.REACT_APP_API_URL+API_CARRERAESTUDIANTE+"/"+carreraestudiante.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("la carrera del estudianteno fue eliminado ")
        })
    }
    );
    const editaasignaciondocente=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    return(
        <div>
        <label>Asignacion de carrera</label>
        <button onClick={mostracrearcarreraestudiante}>Nuevo</button>
        <TableCustom data={carreraestudiantes} borrar={borrarasignaciondocente} mostrar={mostraeditarcarreraestudiante}></TableCustom>
        {crear && <CrearCarrerasEstudiantes showModal={crear} estudiante={props.estudiante}  cancelar={cancelar} crear={crearcarreraestudiante}></CrearCarrerasEstudiantes>}
        {editar && <EditarCarreraEstudiante cancelar={cancelar} estudiante={props.estudiante} carreraestudiante={carreraestudiante} editar={editaasignaciondocente}> </EditarCarreraEstudiante>}
    </div>
    )
}
export default CarreraEstudiantes
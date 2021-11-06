import React,{useEffect,useState} from "react";
import  {API_ASIGNATURA,cabeceras} from "../store/constante"
import axios from "axios";
import Table from "../componentes/Table"
import EditarAsignaturas from "../componentes/asignaturas/EditarAsignaturas";
import CrearAsignaturas from "../componentes/asignaturas/CrearAsignatura";
function Asignatura(){
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [crear,setCrear]=useState(false)
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState({})
    const borrarasignatura=((asignaturas)=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA+"/"+asignaturas.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("La asignatura no fue eliminada ")
        })
    }
    );
    const editarasignaturas=(()=>{
        setAppState(!appState)
        setEditar(false)

    })
    const mostrareditarasignatura=((asignatura)=>{
        setEditar(true)
        setAsignatura(asignatura)
    })
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAsignaturas(repuesta.data);
        })
    },[appState]);
    const mostracrearasignatura=(()=>{
        setCrear(true)
    })
    const crearasignaturas=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    return(
        <div>
            <button onClick={mostracrearasignatura}>Nuevo</button>
            <Table data={asignaturas} borrar={borrarasignatura} mostrar={mostrareditarasignatura}></Table>
            {editar && <EditarAsignaturas cancelar={cancelar}   asignatura={asignatura} editar={editarasignaturas}> </EditarAsignaturas>}
            {crear && <CrearAsignaturas cancelar={cancelar}   asignatura={asignatura} crear={crearasignaturas}> </CrearAsignaturas>}
        </div>
    )
}
export default Asignatura
import React,{useState,useEffect} from "react"
import axios from "axios";
import Table from "../componentes/Table"
import  {API_PLANDEEVALUACION,cabeceras} from "../store/constante"
import EditarPlanEvaluacionDocente from "../componentes/PlanEvaluacionDocente/EditarPlanEvaluacionDocente";
import CrearPlanEvaluacion from "../componentes/PlanEvaluacionDocente/CrearPlanEvaluacion";
function RegistroPlanEvaluacion(){
    const [appState,setAppState]=useState(false)
    const [crear,setCrear]=useState(false)
    const [editar,setEditar]=useState(false)
    const [planEvaluacion,setPlanEvaluacion]=useState({})
    const [planEvaluaciones,setPlanEvaluaciones]=useState([])
    const borrarplanevaluacion=((planEvaluaciones)=>{
        const url=process.env.REACT_APP_API_URL+API_PLANDEEVALUACION+"/"+planEvaluaciones.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        
        .catch(error=>{
            console.log(error)
            alert("El plan de evaluacion  no fue eliminada ")
        })
    }
    );
    const editarplanevaluacion=(()=>{
        setAppState(!appState)
        setEditar(false)

    })
    const mostrareditarasignatura=((plaevaluacion)=>{
        setEditar(true)
        setPlanEvaluacion(plaevaluacion)
    })
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_PLANDEEVALUACION;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setPlanEvaluaciones(repuesta.data);
        })
    },[appState]);
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const crearplanevaluacion=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostracrearplanevaluacion=(()=>{
        setCrear(true)
    })
    return(
        <div>
            <h1>Registro plan evaluacion</h1>
            <button onClick={mostracrearplanevaluacion}>Nuevo</button>
            <Table data={planEvaluaciones} mostrar={mostrareditarasignatura} borrar={borrarplanevaluacion}></Table>
            {editar && <EditarPlanEvaluacionDocente cancelar={cancelar}   planEvaluacion={planEvaluacion} editar={editarplanevaluacion} > </EditarPlanEvaluacionDocente>}
            {crear && <CrearPlanEvaluacion cancelar={cancelar}   planEvaluacion={planEvaluacion} crear={crearplanevaluacion}> </CrearPlanEvaluacion>}
        </div>
    )
}
export default RegistroPlanEvaluacion
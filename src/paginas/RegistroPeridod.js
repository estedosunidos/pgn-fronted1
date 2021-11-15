import React,{useState,useEffect} from "react"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import  {API_PERIODO,cabeceras} from "../store/constante"
import Editarperiodo from "../componentes/Periodo/EditarPeriodo";
import CrearPeriodo from "../componentes/Periodo/CrearPeriodo";
function RegistroPeridod(){
    const [appState,setAppState]=useState(false)
    const [crear,setCrear]=useState(false)
    const [editar,setEditar]=useState(false)
    const [periodo,setPeriodo]=useState({})
    const [periodos,setPeriodos]=useState([])
    const borrarperiodo=((periods)=>{
        const url=process.env.REACT_APP_API_URL+API_PERIODO+"/"+periods.IdPeriodo;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("El periodo  no fue eliminada ")
        })
    }
    );
    const editarperiodo=(()=>{
        setAppState(!appState)
        setEditar(true)

    })
    const mostraeditarperiodo=((periodo)=>{
        setEditar(true)
        setPeriodo(periodo)
    });

    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_PERIODO;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setPeriodos(repuesta.data);
        })
    },[appState]);
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const crearperiodo=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostracrearperiodo=(()=>{
        setCrear(true)
    })
    return(
        <div>
            <h1>Registro periodo</h1>
            <button onClick={mostracrearperiodo}>Nuevo</button>
            <TableCustom data={periodos} mostrar={mostraeditarperiodo} borrar={borrarperiodo}></TableCustom>
            {editar && <Editarperiodo cancelar={cancelar}   periodo={periodo} editar={editarperiodo}> </Editarperiodo>}
            {crear && <CrearPeriodo cancelar={cancelar}   periodo={periodo} crear={crearperiodo}> </CrearPeriodo>}
        </div>
    )
}
export default RegistroPeridod
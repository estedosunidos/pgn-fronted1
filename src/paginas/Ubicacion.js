import React,{useEffect,useState} from "react";
import  {API_UBICACION,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import CrearUbucacion from "../componentes/Ubicacion/CrearUbicacion";
import EditarUbicacion from "../componentes/Ubicacion/EditarUbicacion";
function Ubicacion(){
    const [ubicacions,setUbicacions]=useState([]);
    const [appState,setAppState]=useState(false)
    const [ubicacion,setUbicacion]=useState({})
    const [editar,setEditar]=useState(false)
    const [crear,setCrear]=useState(false)

    const borrarubicacion=((ubicacions)=>{
        const url=process.env.REACT_APP_API_URL+API_UBICACION+"/"+ubicacions.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("La ubicacion no fue eliminado ")
        })
    }
    );

    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_UBICACION;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setUbicacions(repuesta.data);
        })
    },[appState]);

    const mostraeditarubicacion=((ubicacion)=>{
        setEditar(true)
        setUbicacion(ubicacion)
    });

    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarubicacion=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const CrearUbicacion=(()=>{
        setAppState(!appState)
        setCrear(false)
    })

    const mostrarcrearubicacion=(()=>{
        console.log(1)
        setCrear(true)
    })

    return(
        <div>
            <button onClick={mostrarcrearubicacion}>Nuevo</button>
            <TableCustom data={ubicacions} borrar={borrarubicacion} mostrar={mostraeditarubicacion}></TableCustom>
            {editar && <EditarUbicacion showModal={editar} cancelar={cancelar} ubicacion={ubicacion} editar={editarubicacion}> </EditarUbicacion>}
            {crear && <CrearUbucacion showModal={crear} cancelar={cancelar} crear={CrearUbicacion}></CrearUbucacion>}
        </div>
    )
}
export default Ubicacion